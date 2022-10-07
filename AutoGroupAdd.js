/*
Copyright (C) 2020-2021 Riziko Gaming <admin@rizikogaming.com>
*/
registerPlugin({

    name: 'Otomatik Yetki Tamamlayıcı',
    version: '0.1',
    description: 'Belirttiğiniz herhangi bir yetkiyi verdiğinizde otomatik olarak istediğiniz yetkileri tamamlar.',
    author: 'Arda & zuri(buğra) <admin@rizikogaming.com>',
    engines: '>= 0.9.16',

    vars: [{
            name: 'verilcekYetki',
            title: 'Buraya yazdığınız yetkileri aşağıdaki belirttiğiniz yetkilerden birini verdiğinizde otomatik verir.',
            indent: 2,
            type: 'strings'
        },
        {
            name: 'yetkiKontrol',
            title: 'Burada belirttiğiniz yetkilerden herhangi birini verdiğinizde yukarıdaki yetkileri otomatik olarak kullanıcıya verir.',
            indent: 2,
            type: 'strings'
        }

    ]

}, function(sinusbot, config, info) {

    var event = require('event');
    var engine = require('engine');
    var lib = require('OKlib.js');

    if (!lib) {
        engine.log("OKlib yüklenemedi veya bu komut dosyasıyla uyumlu değil. En sonki OKlib sürümünün kurulu olduğundan emin olun. En son sürümü her zaman https://forum.sinusbot.com/resources/oklib.325/ adresinden indirilebilirsiniz.");
        return;
    }


    event.on('ClientServerGroupEvent', function(ev) {
        setTimeout(function() {
            if (ev.client.isSelf()) {
                return;
            }
            if (!ev.client) {
                if (lib.client.isMemberOfOne(ev.client, config.yetkiKontrol)) {
                    lib.client.addToGroups(ev.client, config.verilcekYetki);
                } else{
                    return;
                }
            }
        }, 1000);
    });

    event.on('serverGroupAdded', function(ev) {
        if (lib.client.isMemberOfOne(ev.client, config.yetkiKontrol)) {
            lib.client.addToGroups(ev.client, config.verilcekYetki);
        } else{
            return;
        }
    })

    event.on('chat', function(ev) {

        if (ev.text == '!info' || ev.text == '!who' || ev.text == '!help' || ev.text == '!yardım') {
            ev.client.chat("Bu script Riziko Gaming topluluğunun adminleri tarafından hazırlanmıştır. <ts3 ip: riziko> <https://www.rizikogaming.com>")
        }
    });

});