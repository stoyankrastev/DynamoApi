# Dynamo Api v1

This is a pubic API to Dynamo Software's Dynamo (http://www.dynamosoftware.com/).

In order to use the API, you need a Dynamo account which has granted API access. Please, your administrator or Dynamo Software support for instructions how to acquire one.

This project features code samples in several technologies:
   * JavaScript - for web pages and server-side scripting.
   * C# (.Net Framework) - for desktop tools, backend processing etc.  

# Change log

   * [pending] Official release is expected with the Dynamo 7.0 release.
   * Initial version

# Description

This is a high-level overview of the provided API. For detail description of the format of the input and output arguments, please check the specific sample code provided with this project. 

Login
-----
Performs a login into existing tenant. If the login is successful, will return a session token. This session token will also be assigned as a HTTP-only cookie.

   * Method: POST
   * URL: /v1/login
   * Body: userName=<code>username</code>&password=<code>password</code>&tenant=<code>tenant</code>
   * Response: application/json
   
   <code>{ sidt: 'sessionToken' }</code>

Save
-----
Creates or updates an item. The item is identified by <code>es</code> and <code>id</code>. The properties to be set are provided as a key/value pair.

   * Method: POST
   * URL: /v1/save
   * Body: Stringified JSON object that must contain <code>es</code> and <code>id</code> as a minimum.
   * Response: application/json
   
   <code>{ dynamoId: 'the id of the created/updated item' }</code>

GetByTemplate
----------------
Returns item(s) that match specific template. The item is identified by one or more property/value pairs. 

   * Method: POST
   * URL: /v1/getbytemplate
   * Body: Stringified JSON object that must contain one or more pair of property/value.
   * Header: <code>x-columns</code> a semicolon separated list of properties. 
   * Response: application/json
   
   <code>{ es: 'The type of the item', id: 'the id of the item' }</code> and the test of the property/value pairs requested. 

Download
--------
Returns item(s) that match specific template. The item is identified by one or more property/value pairs. 

   * Method: GET
   * URL: /v1/document/download?dynamoId=<code>document id</code>
   * Response: application/gzip //TODO
   

# MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

No conditions.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


