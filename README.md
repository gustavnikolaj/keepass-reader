# :no_entry: DEPRECATED

I am no longer using or maintaining this application. I would not recommend using
it unless you want to pick up maintenance yourself. If you want to, please get in
touch - you can find my contact information on my GitHub profile. I would be happy
to hand this repo over to you.


# Keepass Reader

KeePass2 read-only client for .kdbx files based on
[Electron](https://github.com/atom/electron).

This is the successor of my old KeePass client based on dmenu,
[keepass-dmenu](https://github.com/gustavnikolaj/keepass-dmenu). It serves the
same purpose - making the passwords in the keepass database easily available.
The KeePass clients out there are all very good at maintaining the database, but
the interface for selecting passwords quickly are lacking. Especially on Linux,
and that is why I initially selected dmenu. dmenu works best in a tiling window
manager, like i3, which I'm using. But at home I've got multiple computers,
each running different setups, ranging from Ubuntu Linux, over Windows, to OSX.
dmenu could probably be made working on other platforms, but I saw more
potential in the Electron framework, and as I'm a node developer it was an
obvious choice for me.

## Installation

Work in progress. The project is still in development, so this is not finalized.
I'm planning on distributing versions for at least Linux and OSX, as those are
the platforms that I use most often. I might add Windows support if I get
annoyed enough with the existing clients. My goal is to distribute binaries for
convenient installation on all supported platforms.

## License

This module is made public under the ISC License.

See the LICENSE file for additional details.
