#!/usr/bin/expect

# 安装

if {$argc<3} {
puts stderr "Usage: $argv0 host user passwd node_version"
exit 1
}

set host [ lindex $argv 0 ]
set user [ lindex $argv 1 ]
set password  [ lindex $argv 2 ]

set timeout 10 
spawn ssh ${user}@${host}

expect {
"*yes/no" { send "yes\r"}
"*password:" { send "$password\r" }
}

expect "*]#"
send "sudo -s\r"
send "cd /home/\r"
send "mkdir -p fishjoy\r"
send "cd fishjoy\r"
send "npm install --production\r"
expect "*]#"
send "exit\r"
# interact