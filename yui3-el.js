YUI().use('node', 'event', function(Y) {
    var _init_attrs = function(e, attrs) {
        for (var attr in attrs) {
            if (attr == 'on') {
                events = attrs[attr];
                for (var event in events) {
                    e.on(event, events[event]);
                }
            } else if (attr == 'after') {
                events = attrs[attr];
                for (var event in events) {
                    e.after(event, events[event]);
                }
            } else if (attr == 'before') {
                events = attrs[attr];
                for (var event in events) {
                    e.before(event, events[event]);
                }
            } else {
                e.setAttribute(attr, attrs[attr]);
            }
        }
    };

    var _append = function(e, child) {
            if (child isinstance Array) {
                for (var i=0; i<child.length; i++) {
                    _append(e, child[i]);
                }
            } else {
                return e.appendChild(child);
            }
        }
    };

    el = function(type, attrs) {
        var e = Y.Node.create('<'+type+'>');
        _init_attr(e, attrs);

        for (var i=2; i<arguments.length; i++) {
            _append(e, arguments[i]);
        }
       
        return e;
    };

    var _named_el = function(type) {
        return function(attrs) {
            var e = el(type, attrs);
            
            for (var i=1; i<arguments.length; i++) {
                _append(e, arguments[i]);
            }
            
            return e;
        };
    };      
            
    _tags = "html head title base link meta style script noscript body section nav article aside h1 h2 h3 h4 h5 h6 hgroup header footer address p hr pre blockquote ol ul li dl dt dd figure figcaption div a em strong small s cite q dfn abbr time code var samp kbd sub sup i b u mark ruby rt rp bdi bdo span br wbr ins del img iframe embed object param video audio source track canvas map area table caption colgroup col tbody thead tfoot tr td th form fieldset legend label input button select datalist optgroup option textarea keygen output progress meter details summary command menu".split(' ');
    for (var i=0; i<tags.length; i++) {
        el[_tags[i]] = _named_el(_tags[i]);
    }
});
