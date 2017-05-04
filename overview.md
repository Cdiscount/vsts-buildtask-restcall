This extension provides a build task to call a web service.

This extension installs the following components:
* A build task to call a web service over HTTP management endpoint.

___

## Create a generic Connection to your web service
* Make sure your webservice interface is exposed and can be reached over the network.

1. Open the Services page in your Visual Studio Team Services Control Panel
1. In the New Service Endpoint list, choose "Generic"
1. Specify your webservice URL, and optionnaly username and password (if you want to use a PAT instead of username/password, set the PAT as password).

___

## Add the Rest Call task to your build or release

1. Edit the build or release you want to update
1. Select the build task "Rest Call" available in the "Utility" category.
1. Set the parameters :
   * WebService endpoint: set the endpoint you previously defined.
   * Relative url to call on endpoint: set the url end part of the url.
   ~~~
    e.g. if your endpoint target a webservice at "http://domain/", you may have to define the relative url to "api/targetedRessource/action".
   ~~~

   * Http method: Get, Post, Put or Delete. Depending on this choice, the following "body" field will be available or not.
   * Body (if Http method set to Post or Put): allows you to set a body if needed (json or whatever you want).
   * Content-type: defines the corresponding http-headers. It has only been tested with "application/json"...
   * save response to file: allows you to save the http response to a file. If checked, the following "output path" parameter will be available.
   * Output file path: defines the path of the file you want to save the http request to.

___

## Enjoy!


Credits : Sylvain Marangon, Alm Team, Cdiscount France.