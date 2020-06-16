import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ApiBaseUrl } from 'constants/env';

export default function useFetch(url) {
	// const [ data, setData ] = useState(null);
	// const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		axios
			.get(ApiBaseUrl + url, { withCredentials: true })
			.then(function(response) {
				setData(response.data);
				setLoading(false);
			})
			.catch(function(error) {
				console.log(error);
			});
	}, []);

	return { data, loading };
}
