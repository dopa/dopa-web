/* Use this script if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-icon-email-01' : '&#xe000;',
			'icon-icon-phone-01' : '&#xe001;',
			'icon-icon-web-01' : '&#xe002;',
			'icon-spinner' : '&#xe003;',
			'icon-twitter' : '&#xe004;',
			'icon-qrcode' : '&#xe005;',
			'icon-dopa-molecule-02' : '&#xe006;',
			'icon-dopa-arrow-down-01' : '&#xe007;',
			'icon-arrow-down' : '&#xe008;',
			'icon-twitter-2' : '&#xe009;',
			'icon-share' : '&#xe00a;',
			'icon-cloud' : '&#xe00b;',
			'icon-chat-alt-stroke' : '&#xe00c;',
			'icon-tag-stroke' : '&#xe00d;',
			'icon-dribbble' : '&#xe00e;',
			'icon-rocket' : '&#xe00f;',
			'icon-fire' : '&#xe010;',
			'icon-heart' : '&#xe011;',
			'icon-heart-2' : '&#xe012;',
			'icon-close' : '&#xe013;',
			'icon-dopa-labs-01' : '&#xe014;',
			'icon-bars' : '&#xe015;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; i < els.length; i += 1) {
		el = els[i];
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};
