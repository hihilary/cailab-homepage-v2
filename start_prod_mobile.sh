mkdir -p /var/log/cailab-homepage
LOG=/var/log/cailab-homepage
PID=/var/log/cailab-homepage/forever.pid

forever -l $LOG/access.log -e $LOG/error.log -o $LOG/out.log -a --pidFile $PID ./build/start-mobile-backend.js
