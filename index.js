const platform = require('./platform.js')();
const macosVersion = require('macos-version');
const winRelease = require('win-release');
const linuxDistro = require('linux-distro');

module.exports = () => (
	new Promise((resolve) => {
		if (platform === 'macos' && macosVersion.is('>10.11'))
			resolve(true);

		if (platform === 'windows') {
			if (winRelease() === '10')
				resolve(true);

			if (winRelease() === '8.1')
				resolve(true);

			if (winRelease() === '8')
				resolve(true);

			if (winRelease() === '7')
				resolve(true);
		}

		if (platform === 'linux') {
			linuxDistro().then((data) => {
				if (data.os === 'Ubuntu') {
					const release1 = data.release.split('.')[0];
					const release2 = data.release.split('.')[1];

					if (Number(release1) >= 12 && Number(release2) >= 4)
						resolve(true);
				}

				if (data.os === 'Debian') {
					const release = data.release.split('.')[0];

					if (Number(release) >= 8)
						resolve(true);
				}

				if (data.os === 'Fedora') {
					const release = data.release.split('.')[0];

					if (Number(release) >= 21)
						resolve(true);
				}

				resolve(false);
			});
		}
	})
);
