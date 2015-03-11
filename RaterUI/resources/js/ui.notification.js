(function ($, undefined) {
    $.widget("ui.notification", {
        slider: null,
        options: {
            width: 100,
            slider: {
                value: 0
            }
        },

        /// <summary>Render the UI and bind any events and controls</summary>
        _create: function () {
            var self = this;
            this.element.width(this.options.width + 30)
            this.slider = $(".notification-slider")
                .width(100)
                .slider({
                    range: "min",
                    value: 0,
                    min: 0,
                    max: 3,
                    step: 1,
                    slide: function (event, ui) {
                        $(".notification-scale SPAN.selected").removeClass("selected");
                        $(".notification-scale-" + ui.value).addClass("selected");
                    },
                    change: $.proxy(this.change, this)
                });
            $(".notification-scale").width(this.options.width)
            $(".notification-scale SPAN").each(function () {
                $(this)
                    //.tooltip()
                    .click(function (event) {
                        self.slider.slider("value", $(this).data("value"));
                    });
            });

            // create icon to open notification settings dialog
            $(".notification-settings-trigger")
                .hover(function (event) {
                    $(this).toggleClass("ui-state-hover");
                })
                .click(function (event) {
                    $(".notification-settings").dialog("open");
                });

            // dialog containing specific notification settings
            $(".notification-settings").dialog({
                autoOpen: false,
                title: "Notification Settings",
                width: 500,
                height: 400
            });
        },

        _init: function () {
            // set default/current value
            this.slider.slider("value", this.options.slider.value);
        },

        change: function (event, ui) {
            var description = $(".notification-scale-" + ui.value).attr("title");
            $(".ui-slider-handle").attr("title", description);
            $.pnotify({
                title: 'Notification Update',
                text: description,
                type: 'info',
                addclass: "pnotify-bottom-right",
                stack: {
                    addpos2: 0,
                    animation: true,
                    dir1: "up",
                    dir2: "left",
                    firstpos1: 25,
                    firstpos2: 25,
                    nextpos1: 25,
                    nextpos2: 25
                }
            });
            console.log({ notification: ui.value })
            if (this.options.change) {
                this.options.change.call(this.element, event, ui);
            }
        },

        /// <summary>Enables use of the notification control.</summary>
        enable: function () {
            $.Widget.prototype.enable.apply(this, arguments);
        },

        /// <summary>Disables use of the notification control.</summary>
        disable: function () {
            $.Widget.prototype.disable.apply(this, arguments);
        },

        /// <summary>Remove all elements and events created by the control</summary>
        destroy: function () {
            $.Widget.prototype.destroy.call(this);
        }
    });
})(jQuery);