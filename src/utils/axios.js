import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: import.meta.env.PROD ? '' : 'http://localhost:8080',
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 30000,
});

axiosInstance.interceptors.request.use(
	function(config) {
		if (config.method === 'put' || config.method === 'delete') {
			config.method = 'post';
		}
		
		//공통파라미터
		const params = {};
		
		//cid(고유키값)이 필요없는 url목록
		let ignoreURL = [
			'/v3/in/jwt/token(GET)',
		];
		
		//formData 형식일 경우
		if (config.data instanceof FormData) {
			let req = config.data.get('req');
			req = {
				...JSON.parse(req),
				...params,
			};
			
			config.data.append('uploadData', new Blowb([JSON.stringify(req)], { type: 'application/json' }));
			config.data.delete('req');
			config.headers['Content-Type'] = 'multipart/form-data';
			return config;
		}
		
		if (config.method === 'get') {
			config.params = { ...config.params, ...params };
		} else {
			config.data = { ...config.data, ...params };
		}
		return config;
	},
	function(error) {
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	function(response) {
		const returnCode = response?.data?.status?.code;
	},
);

export default axiosInstance;