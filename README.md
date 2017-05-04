# This repository contains the code of a Tfs build task that allows to call a REST webservice from a build or a release definition.
This build task allows to call a rest service using the TFS GUI to parameterize the call.

# Use Visual studio code to work on this extension
1. Execute the following command to install vscode:
   ~~~ 
   choco install visualstudiocode
   ~~~
1. clone this repository:
   ~~~ 
   cd <myParentGitFolder>
   git clone 
   cd vsts-buildtask-restcall
   ~~~
1. Retrieve the npm package to allow compilation under vscode:
   ~~~ 
   cd restCallBuildTask
   npm update
   ~~~
1. Start vscode, you can use the following command:
   ~~~
   code .
   ~~~
1. Then in vscode [CTRL+SHIFT+B] should compile without error.

* note: if it doesn't compile correctly, verify that you do not have a path to a bad typescript version (remove path like "C:\Program Files (x86)\Microsoft SDKs\TypeScript\1.0\; " from your PATH (system&user) environment variables).

# Create the extension and publish it
1. If you update the task/extension (not needed on creation) : increment the version number in the task.json file.
1. If you update the task/extension (not needed on creation) : increment the version number in the vss-extension.json file.
1. use the tfx framework, in the root folder of the git repository (where the file vss-extension.json is located), execute:
   ~~~ 
   tfx extension create
   ~~~ 