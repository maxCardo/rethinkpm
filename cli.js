const {program} = require('commander')

program.version('1.0.0')
program.command('test').alias('t').action(() => {
    console.log('running test command line action');
})

program.parse(process.argv)