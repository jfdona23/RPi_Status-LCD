const { exec } = require('child_process')

var cmdOutput = function(err, stdout, stderr) {
    if (err) {
        console.log('It was an error: ' + err)
        return
    }
    console.log('stdout: \n' + stdout)
    console.log('stderr: \n' + stderr)
}

exec('free -h', cmdOutput)

