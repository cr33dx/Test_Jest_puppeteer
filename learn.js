const fetch = require('node-fetch')


async function hello(){
    let fc = await fetch(`https://apigateway-service-test.apps.actionable-science.com/api/v1/${process.env.tenant_id}/train?$filter=status eq 'Active'&$top=1&$orderby=id desc`,{
        method:'get',
        headers: new fetch.Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ2ZnlTTDFGLVJwTmxVaEh3X1FETi1pNVpHNFJWUWo3ZGJ0UU1rVXoxUGcwIn0.eyJqdGkiOiJlOTA5M2Q3Ny1kMzI5LTQ0MGUtYWRlMi0yMWIwYTU4Njc2ZGEiLCJleHAiOjE1NTI5MDkwOTMsIm5iZiI6MCwiaWF0IjoxNTUyODg3NDk4LCJpc3MiOiJodHRwczovL2ZlZGVyYXRpb24tc3RzLXRlc3QuYXBwcy5hY3Rpb25hYmxlLXNjaWVuY2UuY29tL2F1dGgvcmVhbG1zL205MTkxIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjE1ZGU1YWYwLWI4MTAtNGRmNC05NTY4LWQyNWNhY2Y0MmVmNCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFkbWludWktc2VydmljZSIsIm5vbmNlIjoiNmI0YmJiMGEtNzk1Yi00Mzc3LTgxZjktZWJjM2ZmYTM5NjZjIiwiYXV0aF90aW1lIjoxNTUyODg3NDkzLCJzZXNzaW9uX3N0YXRlIjoiOGVkYzkxNWItYTExMy00ZWI3LWEyYjktMTA5MGM4NjI3YTllIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJCb3QgQW5hbHlzdCIsIlVzZXIgQWRtaW4iLCJBZ2VudCIsImFnZW50IiwiVXNlciIsIlN1cHBvcnQgVXNlciIsInN1cHBvcnRfdXNlciIsInRpY2tldGluZ19hZG1pbiIsIlRpY2tldGluZyBBZG1pbiIsImN1c3RvbWVyX2FuYWx5c3QiLCJvZmZsaW5lX2FjY2VzcyIsImJvdF9hbmFseXN0IiwiQWdlbnQgQWRtaW4iLCJ1bWFfYXV0aG9yaXphdGlvbiIsInFuYV9hbmFseXN0IiwidXNlciIsImFnZW50X2FkbWluIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiTW9iaWxlIE5pbmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbnVzZXIiLCJnaXZlbl9uYW1lIjoiTW9iaWxlIiwiZmFtaWx5X25hbWUiOiJOaW5lIiwiZW1haWwiOiJtOTE5MUB5b3BtYWlsLmNvbSJ9.qpbqprXoRSUsxmfXmRldXTww8I21ZOfHyVP3HzHEZU3wdqxXvQeLuPNHfw1rciTzXulBfLZpc7puFbitGjQGyzYto_r-ekHpwzyGAay4Dbtu_-zfSHQ2_pSOY6LWRmKx2_Ng94qRis2XXNSaPBA64yaXbtM6988EEvxnVK6eejqTvVpAfMMoCAhyaa4k7CjG7snZeO9XEQuU72MnEsNOSp7Yg9hqool3aYNJCpU6KgjDCgGa-juYpo_tW-7wQpw_2obABQ8AX_GE4gGy0kOJkCEX2msqFZUdZCJcdlYhYPN7kBwpLZYLzmCiUAba2OwZkRGPCLrtstD8wjWVvukuog` 
        })
    })
    let data = await fc.json()
    let resp = (JSON.stringify(data, null, "\t"))
    console.log(data[0].utterance)
    return resp[0].utterance
}

hello()