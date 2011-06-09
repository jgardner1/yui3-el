var EL;
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
        if (child instanceof Array) {
            for (var i=0; i<child.length; i++) {
                _append(e, child[i]);
            }
        } else {
            return e.appendChild(child);
        }
    };

    EL = function(type, attrs) {
        var e = Y.Node.create('<'+type+'>');
        _init_attrs(e, attrs);

        for (var i=2; i<arguments.length; i++) {
            _append(e, arguments[i]);
        }
       
        return e;
    };

    var _named_el = function(type) {
        return function(attrs) {
            var e = EL(type, attrs);
            
            for (var i=1; i<arguments.length; i++) {
                _append(e, arguments[i]);
            }
            
            return e;
        };
    };      
            
    _tags = "HTML HEAD TITLE BASE LINK META STYLE SCRIPT NOSCRIPT BODY SECTION NAV ARTICLE ASIDE H1 H2 H3 H4 H5 H6 HGROUP HEADER FOOTER ADDRESS P HR PRE BLOCKQUOTE OL UL LI DL DT DD FIGURE FIGCAPTION DIV A EM STRONG SMALL S CITE Q DFN ABBR TIME CODE VAR SAMP KBD SUB SUP I B U MARK RUBY RT RP BDI BDO SPAN BR WBR INS DEL IMG IFRAME EMBED OBJECT PARAM VIDEO AUDIO SOURCE TRACK CANVAS MAP AREA TABLE CAPTION COLGROUP COL TBODY THEAD TFOOT TR TD TH FORM FIELDSET LEGEND LABEL INPUT BUTTON SELECT DATALIST OPTGROUP OPTION TEXTAREA KEYGEN OUTPUT PROGRESS METER DETAILS SUMMARY COMMAND MENU".split(' ');
    for (var i=0; i<_tags.length; i++) {
        window[_tags[i]] = _named_el(_tags[i]);
    }

});
