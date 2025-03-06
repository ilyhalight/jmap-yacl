# 1.2.1

- Rewritted typebox generation logic with `@toil/typebox-genx`
- Updated dev depends

# 1.2.0

## Client

- Added api and types export not only from the main file
- Added comments with link to RFC page for APIs
- [!] Removed `client.downloadBlob` method. Use `client.blob.download` instead
- Fixed a bug where the download method returned text instead of arraybuffer
- Some string unions have been put into separate types
- Some comments have been converted to jsdoc
- Improved typings

## Workspace

- Changed the build method to a regular tsc
- Removed Dist and Docs folders from git
- Removed sonarjs plugin
- Eslint config rewrited with flat style
- Now docs generated in github actions
- Updated depends

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
