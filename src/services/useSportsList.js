import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_FAVOURITE_SPORTS } from 'src/graphQL';
import { useDispatch, useSelector } from 'react-redux';
import { setSportsList } from 'src/store/types';
import { stageToken } from 'src/utils/list';
import Config from 'react-native-config';

const useSportsList = (policyType) => {

    const dispatch = useDispatch();
    const reduxData = useSelector(state => state.user);
    const [favoriteSports, setFavoriteSports] = useState([]);
    const { loading, refetch } = useQuery(GET_USER_FAVOURITE_SPORTS, {
        variables: {
            cognitoId: reduxData?.userData?.sub,
        },
        fetchPolicy: policyType,
        notifyOnNetworkStatusChange: true,
        context: {
            headers: {
              authorization:
                Platform.OS === "android" ? `Bearer ${stageToken}` :
                  Config?.BEARER_TOKEN
                    ? `Bearer ${Config.BEARER_TOKEN}`
                    : '',
            },
          },
        onCompleted: data => {
        if (reduxData?.user && !loading && data && data?.consumers && data?.consumers.length > 0) {
            const filteredEvents = data?.consumers?.[0]?.favoriteSports.filter(element => {
            const { sport, categories } = element;
            // Check if all required properties exist
            if (sport?.name
                && categories && categories.length > 0
            ) {
                return true;
            }
            return false;
            });
            setFavoriteSports(filteredEvents);
            dispatch(setSportsList(filteredEvents));
        }
        },
        onError: error => {
        console.log('error : ', error);
        },
    });

    return {
        refetch,
        loading,
        favoriteSports
    };
}

export default useSportsList