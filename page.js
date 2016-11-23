/**
 * ����kkpager��ҳ�������
 */
;(function($,window,undefind){
//Ĭ�ϲ���
    var default_config = {
        pagerid : 'kingPaging', //divID
        mode: 'link', //ģʽ(link ���� click)
        pno: 1, //��ǰҳ��
        total: 1, //��ҳ��
        totalRecords: 0, //����������
        isShowFirstPageBtn: false, //�Ƿ���ʾ��ҳ��ť
        isShowLastPageBtn: false, //�Ƿ���ʾβҳ��ť
        isShowPrePageBtn: true, //�Ƿ���ʾ��һҳ��ť
        isShowNextPageBtn: true, //�Ƿ���ʾ��һҳ��ť
        isShowTotalPage : true, //�Ƿ���ʾ��ҳ��
        isShowTotalRecords: true, //�Ƿ���ʾ�ܼ�¼��
        isGoPage : true,//�Ƿ���ʾҳ����ת�����
        hrefFormer: 'kingPaging', //����ǰ��
        hrefLatter: '.html', //����β��
        gopageWrapClass: 'gopageWrap',
        gopageButtonClass: 'gopageBtn',
        gopageTextClass: 'gopageText',
        lang: {
            firstPageText: '��ҳ',
            firstPageTipText: '��ҳ',
            lastPageText: 'βҳ',
            lastPageTipText: 'βҳ',
            prePageText: '��һҳ',
            prePageTipText: '��һҳ',
            nextPageText: '��һҳ',
            nextPageTipText: '��һҳ',
            totalPageBeforeText: '��',
            totalPageAfterText: 'ҳ',
            totalRecordsAfterText: '������',
            gopageBeforeText: 'ת��',
            gopageButtonOkText: 'ȷ��',
            gopageAfterText: 'ҳ',
            buttonTipBeforeText: '��',
            buttonTipAfterText: 'ҳ'
        },
//ҳ�뵥���¼���������������clickģʽ��,����nΪҳ��
        click : function(n){
//�����Լ�ʵ��
//���������this����
            this.selectPage(n);
            return false;
        },
//��ȡhref��ֵ��������clickģʽ��,����nΪҳ��
        getHref : function(n){
//Ĭ�Ϸ���'#'+n
            return ('#'+n);
        },
//�����㷨��������linkģʽ��,����nΪҳ��
        getLink:function(n){
//������㷨�����ڱ��磺
//hrefFormer=http://www.xx.com/news/20131212
//hrefLatter=.html
//��ô��ҳ����1ҳ������http://www.xx.com/news/20131212.html
//��2ҳ����http://www.xx.com/news/20131212_2.html
//��nҳ����http://www.xx.com/news/20131212_n.html
            if(n == 1){
                return this.hrefFormer + this.hrefLatter;
            }
            return this.hrefFormer + '_' + n + this.hrefLatter;
        }
    };
    function KingPaging(element,config){
        this.userOptions = config;
        this.defaultOptions = default_config;
        this.options = $.extend(true,{},this.defaultOptions,this.userOptions);
        this.element = element || $("#"+this.options.pagerid);
        this.paintPagingHtml(this.options);
    }
    KingPaging.prototype = {
        init:function(config){//��ʼ�����ò���
            this.options.pno = isNaN(config.pno) ? 1 : parseInt(config.pno);
            this.options.total = isNaN(config.total) ? 1 : parseInt(config.total);
            this.options.totalRecords = isNaN(config.totalRecords) ? 0 : parseInt(config.totalRecords);
            if(!this._config){
                this._config = config;
            }
//validate
            if(this.options.pno < 1) this.options.pno = 1;
            this.options.total = (this.options.total <= 1) ? 1: this.options.total;
            if(this.options.pno > this.options.total) this.options.pno = this.options.total;
            this.options.prv = (this.options.pno<=2) ? 1 : (this.options.pno-1);
            this.options.next = (this.options.pno >= this.options.total-1) ? this.options.total : (this.options.pno + 1);
            this.options.hasPrv = (this.options.pno > 1);
            this.options.hasNext = (this.options.pno < this.options.total);

            this.inited = true;
        },
        selectPage : function(n){//��ˢ��ҳ��ֱ���ֶ�����ѡ��ĳһҳ��
            this._config['pno'] = n;
            this.paintPagingHtml(this._config,true);
        },
        paintPagingHtml:function(config,enforceInit){//���ɿؼ�����
            if(enforceInit || !this.inited){
                this.init(config);
            }
            var str_first='',str_prv='',str_paging = '',str_next='',str_last='',str_total_info='',str_gopage_info='';
            var dot = '<span>...</span>',str_all ='';
//��ʾ��ҳ
            if(this.options.isShowFirstPageBtn){
                if(this.options.hasPrv){
                    str_first = '<a '+this._getHandlerStr(1)+' title="'
                        +(this.options.lang.firstPageTipText || this.options.lang.firstPageText)+'">'+this.options.lang.firstPageText+'</a>';
                }else{
                    str_first = '<span class="disabled">'+this.options.lang.firstPageText+'</span>';
                }
            }
//��ʾ��һҳ
            if(this.options.isShowPrePageBtn){
                if(this.options.hasPrv){
                    str_prv = '<a '+this._getHandlerStr(this.options.prv)+' title="'
                        +(this.options.lang.prePageTipText || this.options.lang.prePageText)+'">'+this.options.lang.prePageText+'</a>';
                }else{
                    str_prv = '<span class="disabled">'+this.options.lang.prePageText+'</span>';
                }
            }
//��ʾ��һҳ
            if(this.options.isShowNextPageBtn){
                if(this.options.hasNext){
                    str_next = '<a '+this._getHandlerStr(this.options.next)+' title="'
                        +(this.options.lang.nextPageTipText || this.options.lang.nextPageText)+'">'+this.options.lang.nextPageText+'</a>';
                }else{
                    str_next = '<span class="disabled">'+this.options.lang.nextPageText+'</span>';
                }
            }
//��ʾβҳ
            if(this.options.isShowLastPageBtn){
                if(this.options.hasNext){
                    str_last = '<a '+this._getHandlerStr(this.options.total)+' title="'
                        +(this.options.lang.lastPageTipText || this.options.lang.lastPageText)+'">'+this.options.lang.lastPageText+'</a>';
                }else{
                    str_last = '<span class="disabled">'+this.options.lang.lastPageText+'</span>';
                }
            }
//��ҳ����
            if(this.options.total <= 8){
                for(var i=1;i<=this.options.total;i++){
                    if(this.options.pno == i){
                        str_paging += '<span class="curr">'+i+'</span>';
                    }else{
                        str_paging += '<a '+this._getHandlerStr(i)+' title="'
                            +this.options.lang.buttonTipBeforeText + i + this.options.lang.buttonTipAfterText+'">'+i+'</a>';
                    }
                }
            }else{
                if(this.options.pno <= 5){
                    for(var i=1;i<=8;i++){
                        if(this.options.pno == i){
                            str_paging += '<span class="curr">'+i+'</span>';
                        }else{
                            str_paging += '<a '+this._getHandlerStr(i)+' title="'+
                                this.options.lang.buttonTipBeforeText + i + this.options.lang.buttonTipAfterText+'">'+i+'</a>';
                        }
                    }
                    //str += dot;
                }else{
                    str_paging += '<a '+this._getHandlerStr(1)+' title="'
                        +this.options.lang.buttonTipBeforeText + '1' + this.options.lang.buttonTipAfterText+'">1</a>';

                    str_paging += dot;

                    var begin = this.options.pno - 2;
                    var end = this.options.pno + 2;
                    if(end > this.options.total){
                        end = this.options.total;
                        begin = end - 4;
                        if(this.options.pno - begin < 2){
                            begin = begin-1;
                        }
                    }else if(end + 1 == this.options.total){
                        end = this.options.total;
                    }
                    for(var i=begin;i<=end;i++){
                        if(this.options.pno == i){
                            str_paging += '<span class="curr">'+i+'</span>';
                        }else{
                            str_paging += '<a '+this._getHandlerStr(i)+' title="'
                                +this.options.lang.buttonTipBeforeText + i + this.options.lang.buttonTipAfterText+'">'+i+'</a>';
                        }
                    }
                    if(end != this.options.total){
                        str_paging += dot;
//add
                        str_paging+='<a '+this._getHandlerStr(this.options.total)+' title="'
                            +this.options.lang.buttonTipBeforeText + this.options.total + this.options.lang.buttonTipAfterText+'">'+this.options.total+'</a>';
                    }
                }
            }
//��ʾ��ҳ/��������
            if(this.options.isShowTotalPage || this.options.isShowTotalRecords){
                str_total_info = '&nbsp;<span class="normalsize">'+this.options.lang.totalPageBeforeText;
                if(this.options.isShowTotalPage){
                    str_total_info += this.options.total + this.options.lang.totalPageAfterText;
                    if(this.options.isShowTotalRecords){
                        str_total_info += '/';
                    }
                }
                if(this.options.isShowTotalRecords){
                    str_total_info += this.options.totalRecords + this.options.lang.totalRecordsAfterText;
                }

                str_total_info += '</span>';
            }
//��ʾ��ת
            if(this.options.isGoPage){
                str_gopage_info = '&nbsp;'+this.options.lang.gopageBeforeText+'<span class="'+this.options.gopageWrapClass+'">'+
                    '<input type="button"class="'+this.options.gopageButtonClass+'"value="'+this.options.lang.gopageButtonOkText+'"/>'+
                    '<input type="text"class="'+this.options.gopageTextClass+'"value="'+this.options.next+'"/></span>'
                    +this.options.lang.gopageAfterText;
            }


            str_all ="&nbsp;"+ str_first + str_prv + str_paging + str_next + str_last + str_total_info + str_gopage_info;
            this.element.html(str_all);
            if(this.options.mode =="click"){
                this._bindEventPaging();
            }
            this.options.isGoPage && this._bindEventGoPage();
        },
        _bindEventPaging:function(){//���¼�-��ҳ
            var me = this;
            this.element.find("a").off("click").on("click",function(){//��ҳ
                var pno = $(this).attr("href").slice(1);
                me._clickHandler.call(me,pno);
            })
        },
        _bindEventGoPage:function(){
            var me = this;
            this.element.find('.'+this.options.gopageTextClass).off("focus blur keypress").on("focus blur keypress",function(event){//text
                if(event.type =="focus"){
                    me.focus_gopage();
                }else if(event.type =="blur"){
                    me.blur_gopage();
                }else if(event.type =="keypress"){
                    me.keypress_gopage();
                }

            })
            this.element.find('.'+this.options.gopageButtonClass).off("focus blur keypress").on("focus blur keypress",function(event){//btn
                me.gopage()
            })
        },
//��ת��õ����뽹��ʱ
        focus_gopage :function (){
            var $btnGo = this.element.find('.'+this.options.gopageButtonClass);
            var $txtGo = this.element.find('.'+this.options.gopageTextClass);
            var $wrapGo = this.element.find('.'+this.options.gopageWrapClass);
            $txtGo.attr('hideFocus',true);
            $wrapGo.css('border-color','#6694E3');
            $btnGo.css({
                'left':'0px'
            }).show().animate({left: '+=45'}, 50,function(){
                $wrapGo.css('width','88px');
            });
        },
//��ת��ʧȥ���뽹��ʱ
        blur_gopage : function(){
            var $btnGo = this.element.find('.'+this.options.gopageButtonClass);
            var $wrapGo = this.element.find('.'+this.options.gopageWrapClass);
            this.setTimeOutID && clearTimeout(this.setTimeOutID);
            this.setTimeOutID = setTimeout(function(){
                $btnGo.animate({
                    left: '-=45'
                }, 100, function(){
                    $btnGo.css({
                        "left":"0px"
                    }).hide();
                    $wrapGo.css({
                        "border-color":"#DFDFDF",
                        "width":"44px"
                    });
                });
            },400);
        },
//��ת����򰴼�����
        keypress_gopage : function(){
            var event = arguments[0] || window.event;
            var code = event.keyCode || event.charCode;
            //delete key
            // if(code == 8) return true;
            //enter key
            if(code == 13){
                this.gopage();
                return false;
            }
            //copy and paste
            if(event.ctrlKey && (code == 99 || code == 118)) return true;
            //only number key
            if(code<48 || code>57)return false;
            return true;
        },
//��ת��ҳ����ת
        gopage : function(){
            var $txtGo = this.element.find('.'+this.options.gopageTextClass);
            var str_page = $txtGo.val();
            if(isNaN(str_page)){
                $txtGo.val(this.options.next);
                return;
            }
            var n = parseInt(str_page);
            if(n < 1) n = 1;
            if(n > this.options.total) n = this.options.total;
            if(this.options.mode == 'click'){
                this._clickHandler(n);
            }else{
                window.location = this.options.getLink.call(this.options,n);
            }
        },
        _getHandlerStr:function(n){
            if(this.options.mode == 'click'){
                return 'href="'+this.options.getHref(n)+'"';
            }
//linkģʽ��Ҳ��Ĭ�ϵ�
            // ע��ı���thisָ��
            return 'href="'+this.options.getLink.call(this.options,n)+'"';
        },
        _clickHandler:function(n){
            var res = false;
            if(this.options.click && typeof this.options.click == 'function'){
                res = this.options.click.call(this,n) || false;
            }
            return res;
        }
    };

    window.KingPaging = KingPaging;
    $.fn.KingPaging = function(options) {
        return this.each(function() {
            if (!$(this).data('KingPaging')) {
                $(this).data('KingPaging', new KingPaging($(this), options));
            }
        });
    };
})(jQuery,window);

/*
function getParameter(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
}

//init
var totalPage = 15;
var totalRecords = 390;
var pageNo = getParameter('pno');
if(!pageNo){
    pageNo = 1;
}

$(function(){

    var obj1 = {
        pagerid:"kingPaging",
        //��ǰҳ
        pno : pageNo,
        //��ҳ��
        total : totalPage,
        //����������
        totalRecords : totalRecords,
        mode : 'click',//Ĭ��ֵ��link����ѡlink����click
        click : function(n){
            this.selectPage(n);
            return false;
        }
    }
    var paging = new KingPaging(null,obj1);
    var obj2  = {
        pagerid:"kingPaging2",
        //��ǰҳ
        pno : pageNo,
        //��ҳ��
        total : totalPage,
        //����������
        totalRecords : totalRecords,
        mode : 'link',//Ĭ��ֵ��link����ѡlink����click
        hrefFormer:"kingPaging",
        hrefLatter: '.html', //����β��
        getLink:function(n){
            return this.hrefFormer + this.hrefLatter + "?pno="+n+"&kingPaging=2";
        }
    }
    //var paging2 = new KingPaging(null,obj2)
    $("#kingPaging2").KingPaging(obj2);

})*/
