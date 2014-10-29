var installer = require('strong-service-install');

var opts = {
  name: 'APScontrol',
  author: "Roy Veatch",
  user: process.env.USER,
  command: 'nodejs /RV/APScontrol/index.js',
  cwd: "/RV/APScontrol/",
};

installer(opts, function(err, result) {
  if (err) {
    console.error('Failed to install "my-app" service:', err.message);
    process.exit(1);
  } else {
    console.log('Successfully installed "my-app" service:', result);
    process.exit(0);
  }
});
