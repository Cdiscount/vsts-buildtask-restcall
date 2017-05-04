import tl = require('vsts-task-lib');
import request = require('request');
export module Engine{
	export class RestCall{
		_saveResponseToFile:boolean;
		_outputFilePath:string;
		
		constructor(saveResponseToFile:boolean, outputFilePath:string){
			this._saveResponseToFile = saveResponseToFile;
			this._outputFilePath = outputFilePath;	
		}

		call(webServiceUrl: string, httpVerb: string, body: string, useBasicAuthentication: Boolean, username: string, password: string, contentType:string, timeout: number){
			if(useBasicAuthentication){
				request({
					uri: webServiceUrl,
					// qs: { force: true }, //Query string data
					method: httpVerb,
					headers: {
          					'content-type' : contentType
        				},
					body: body,
					auth: {
						user: username,
						pass: password
					},
					timeout: timeout
				}, this.callBack);
			}
			else {
				request({
					uri: webServiceUrl,
					method: httpVerb,
					headers: {
          					'content-type' : contentType
        				},
					body: body,
					timeout: timeout
				}, this.callBack.bind(this));
			}
		}
		
		callBack(error, response, body) {
			if (error) {
				tl.debug("Request ko with code: '".concat(response && response.statusCode).concat("'. Error is : '").concat(error));
				throw new Error("Request error:".concat(error));
			}
		
			tl.debug(body);
		
			if (response.statusCode >= 200 && response.statusCode < 400) {
				tl.debug('Response ok.');                
			} 
			else {
				tl.debug("Request ko with code: '".concat(response.statusCode).concat("'."));   
				throw new Error("Request error with code: '".concat(response.statusCode).concat("'."));
			}
			// let jsonResponse = JSON.parse(body);
			if(this._saveResponseToFile){
				tl.debug("saving to: ".concat(this._outputFilePath));
				tl.writeFile(this._outputFilePath, body);
			}
		}
	}
}