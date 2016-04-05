var tenant = require("./helpers/testsubject.js");
var request = require('request');
var querystring = require('querystring');

var sessionCookies = null;

var apiGet = function (name, args, headers, cb) {
    
    if (!cb) {
        cb = headers;
        headers = null;
    }
    
    if (name[0] != '/') name = '/' + name;
    
    var query = '';
    if (args) {
        query = '?' + querystring.stringify(args);    
    }
    
    var options = { url: tenant.apiurl + name + query };
    if (sessionCookies) {
        options.headers = { 'Cookie': sessionCookies };
    }
    
    if (headers) {
        for (var key in headers) {
            if (headers.hasOwnProperty(key)) {
                options.headers = options.headers || {};
                options.headers[key] = headers[key];
            }
        }
    }
    
    request.get(options, function(err, res, body) {
        
        //console.log('err: ' + err);
        //console.log('body: ' + body);
        //console.log('statusCode: ' + res.statusCode);
        //console.log('response cookies: ' + JSON.stringify(res.headers['set-cookie']));
        
        if (err) throw err;
        
        if (res.statusCode != 200) {
            cb(body);
        } else {
            
            sessionCookies = res.headers['set-cookie'] || sessionCookies;
        
            if (body) body = JSON.parse(body);
            cb(null, body);    
        }

    });
};

var apiPost = function (name, args, cb) {
    
    if (name[0] != '/') name = '/' + name;
    
    var options = { url: tenant.apiurl + name, form: args };
    if (sessionCookies) {
        options.headers = {'Cookie': sessionCookies};
    }
     
    request.post(options, function(err, res, body) {
        
        //console.log('err: ' + err);
        //console.log('body: ' + body);
        //console.log('statusCode: ' + res.statusCode);
        //console.log('response cookies: ' + JSON.stringify(res.headers['set-cookie']));
        
        if (err) throw err;
        
        if (res.statusCode != 200) {
            cb(body);
        } else {
            
            sessionCookies = res.headers['set-cookie'] || sessionCookies;
        
            if (body) body = JSON.parse(body);
            cb(null, body);    
        }

    });

};

var apiLogin = function (args, cb) {
    
    sidt = null;
    
    apiPost('login', args, function (err, data) {
        
        if (err) return cb(err);
        
        sidt = data.sidt;
        
        cb(null, data);
        
    });
    
};
 
describe("login", function () {
    
    it('with invalid credentials', function (done) {
        
        var args = {
            username: 'these is no such user there',
            password: tenant.password,
            tenant: tenant.name    
        };

        //POST login
        //  In case of an error, the statusCode will be 500 and the body could contain a human readable description

        apiPost('login', args, function (err, data) {
            expect(err).toBeTruthy();
            done();
        });
            
    });
    
    it('with valid credentials', function (done) {
        
        var args = {
            username: tenant.username,
            password: tenant.password,
            tenant: tenant.name    
        };

        //POST login
        //  upon success returns an object with a session token

        apiPost('login', args, function (err, data) {
            expect(err).toBeFalsy();
            expect(data.sidt).toBeTruthy();
            done();
        });

        
    });
    
    
});

describe("read/write", function () {
    
    it("save should create items", function (done) {
        
        var args = {
            username: tenant.username,
            password: tenant.password,
            tenant: tenant.name    
        };
        
        var item = {
            es: 'Contact',
            id: '48a052cb-b3c2-47de-9e05-bb518fe11160',
            fullname: 'john smith'
        };
        
        apiPost('login', args, function (err, data) {

            apiPost('save', JSON.stringify(item), function (err, data) {

                expect(err).toBeFalsy();
                expect(data.dynamoId).toBe('48a052cb-b3c2-47de-9e05-bb518fe11160');
                   
                done();
                
            });

        });

    });
    
    xit("save should update existing items", function (done) {
    
        done.fail('Implement me');        

    });

    xit("save should accept array of items", function (done) {
    
        done.fail('Implement me');        

    });

    xit("GetByTemplate should return related items", function (done) {
    
        done.fail('Implement me');        

    });


    it("getbyid should return existing items", function (done) {
    
        var args = {
            username: tenant.username,
            password: tenant.password,
            tenant: tenant.name    
        };
        
        var item = {
            es: 'Contact',
            id: 'D7B0576D-1910-436A-8E64-A90619960F05',
            fullname: 'Indiana Jones'
        };
        
        apiPost('login', args, function (err) {

            apiPost('save', JSON.stringify(item), function (err) {

                apiGet('getbyid', { entityName: 'Contact', dynamoId: 'D7B0576D-1910-436A-8E64-A90619960F05' }, { 'x-columns': 'fullname' }, function (err, data) {
   
                    expect(err).toBeFalsy();
                    
                    expect(data.fullname).toBe('Indiana Jones');                 
                    
                    done();
                });
                
            });

        });

    });
    
    
});