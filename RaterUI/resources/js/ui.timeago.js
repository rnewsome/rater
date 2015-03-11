(function ($) {
    $.widget("ui.timeago", {
        version: "1.0",
        widgetName: "timeago",
        options: {
            // update once a minute by default
            "rate": 1000,
            "timestamp": undefined,
            "format": undefined
        },
        _intervalId: undefined,
        
        _create: function () {
            if(!this.options.timestamp) {
                this.options.timestamp = this.element.attr("data-timestamp");
            }
            // refresh the "time ago" every X milliseconds
            this._intervalId = window.setInterval(this.refresh.bind(this), this.options.rate);
        },

        refresh: function () {
            // update the text of the element with the latest timeago
            var m = moment(this.options.timestamp, this.options.format),
                diff = moment().diff(m, "s"),
                time = m.fromNow();
            this.element.text(time);

            var rate = 1000;
            if (diff < 60) {
                // if the difference is less than 60 seconds then set the
                // interval rate to be every second
                rate = 1000;
            } else if (diff >= 60 && diff < 3600) {
                // set the interval rate to be every minute since the
                // difference is less than an hour
                rate = 60000;
            } else {
                // once the difference is over an hour then set the refresh
                // rate to be once every hour
                rate = 3600000;
            }
            if (rate !== this.options.rate) {
                // the refresh rate has changed so degrade the interval to match
                // the new rate
                this.options.rate = rate;
                window.clearInterval(this._intervalId);
                this._intervalId = window.setTimeout(this.refresh.bind(this), this.options.rate);
            }
        },

        enable: function () { },
        disable: function () { },
        _destroy: function () {
            // clear the interval when this control is destoried
            window.clearInterval(this._intervalId);
        }
    });
})(jQuery);