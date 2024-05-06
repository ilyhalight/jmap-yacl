# 1.1.0

- Added support of Blob Upload (with test case) and Blob Copy
- Added update internal API when using the connect method
- [!] Blob API moved to client.blob.\*, method `client.downloadBlob` is marked as deprecated
- Base class of API renamed from ExampleAPI to BaseAPI
- Fixed an error that caused the previous value of client.session to remain when the client.connect method was called unsuccessfully
- Removed non-standard type DownloadBlobResponse
- Removed extra console.log from test file

# 1.0.0

- Initial release
