import { Engine } from "./references";
import tl = require('vsts-task-lib');

class Main{
    run(){
        // let webServiceUrl = tl.getInput('webserviceUrl', true);
        let httpVerb = tl.getInput('httpVerb', true);
        let body = tl.getInput('body', false);

        let saveResponseToFile = tl.getBoolInput('saveResponseToFile', false);
        let outputFilePath:string;
        if(saveResponseToFile){
            outputFilePath = tl.getPathInput("outputFilePath", false);
        }

        let allowInvalidSSLCertificate = tl.getBoolInput('allowInvalidSSLCertificate', true)
        let webServiceEndpoint = tl.getInput('webserviceEndpoint', true);
        let relativeUrl = tl.getInput('relativeUrl', false);
        let webServiceEndpointUrl = tl.getEndpointUrl(webServiceEndpoint, false);
        let webServiceEndpointUsername = tl.getEndpointAuthorizationParameter(webServiceEndpoint, "username", true);
        let webServiceEndpointPassword = tl.getEndpointAuthorizationParameter(webServiceEndpoint, "password", true);
        let useBasicAuthentication = false;
        if(webServiceEndpointUsername != null || webServiceEndpointPassword != null){
            useBasicAuthentication = true;
            if(webServiceEndpointUsername == null){
                // PAT is set into password var
                webServiceEndpointUsername = "";
            }
        }

        let finalUrl = webServiceEndpointUrl;
        if(relativeUrl != null){
            finalUrl = finalUrl.concat(relativeUrl);
        }

        let timeout = tl.getInput('timeout', false);
        let timeoutValue:number;
        if(timeout == null){
            timeoutValue = 120000; // default timeout set to 2 minutes
        }
        else{
            timeoutValue = parseInt(timeout);
        }

        let contentType = tl.getInput('contentType', true);

        let headers = tl.getInput('headers', false);

        // This might throw if invalid JSON.
        try {
            headers = JSON.parse(headers);
        } catch (e) {
            throw new Error("Invalid headers JSON format.");
        }

        new Engine.RestCall(saveResponseToFile, outputFilePath).call(finalUrl, httpVerb, body, useBasicAuthentication, webServiceEndpointUsername, webServiceEndpointPassword, contentType, timeoutValue, allowInvalidSSLCertificate, headers);
    }
}

new Main().run();