const fs = require( 'fs' );

const pkg = require( '../package.json' );
const version = pkg.version;

let css = fs.readFileSync( './hal-publications-block.php', 'utf8' );
css = css.replace( /Version:\s*[0-9.]+/, `Version: ${ version }` );
fs.writeFileSync( './hal-publications-block.php', css );
let json = fs.readFileSync( './src/block.json', 'utf8' );
json = json.replace( /"version":\s*"[0-9.]+"/, `"version":"${ version }"` );
fs.writeFileSync( 'src/block.json', json );

console.log( 'Updated plugin version to ' + version );
