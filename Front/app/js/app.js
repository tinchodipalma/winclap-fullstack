((window, Plotly) => {
    const DATA_URI = 'data.json';
    const DTABLE_OPTIONS = {
        sortable: true,
        fixedHeight: true,
        perPage: 10
    };
    const CHART_OPTIONS = {
        width: 100,
        height: 75,
        maxHeight: 400
    };

    let vueTable = new Vue({
        el: '#vueTable',
        data: {
            labels: [],
            data: [],
            dateFormat: 'Y-MM-DD HH:mm:ss',
            hiddenKeys: [],
            dataTable: null
        },
        methods: {
            isHidden(index) {
                return this.hiddenKeys.includes(index);
            },
            toggleColumn(index) {
                if (this.hiddenKeys.includes(index)) {
                    this.hiddenKeys.splice(this.hiddenKeys.indexOf(index), 1);
                } else {
                    const MAX_HIDDEN_LABELS = this.labels.length - 1;
                    if (this.hiddenKeys.length < MAX_HIDDEN_LABELS) {
                        this.hiddenKeys.push(index);
                    } else {
                        // Avoid checkbox to be unchecked
                        let checkboxElement = document.getElementById('checklabel-' + index);
                        checkboxElement.checked = true;
                    }
                }
            }
        }
    });

    let vueChart = new Vue({
        el: '#vueChart',
        data: {
            labels: vueTable.labels,
            data: vueTable.data,
            gd: null,
            chart: null
        }
    });

    window.onresize = function() {
        if (vueChart.gd) {
            Plotly.Plots.resize(vueChart.gd);
        }
    };

    fetchData();


    function fetchData() {
        return fetch(DATA_URI)
            .then(response => response.json())
            .then(response => {
                let { data, labels, groups } = formatData(response);
                vueTable.labels = labels;
                vueTable.data = data;

                return { data, labels, groups };
            })
            .then(({ data, labels, groups }) => {
                vueTable.dataTable = new DataTable(
                    document.getElementById('dataTable'),
                    DTABLE_OPTIONS
                );

                generateChart({ data, labels, groups });
            });
    }

    function generateChart({ data, labels, groups }) {
        let xAxis = Object.keys(groups).map(groupDate => {
            return moment(groups[groupDate].date).format('Y-MM-DD HH:mm:ss');
        });

        let yAxisSet = labels.map(label => {
            let values = [];
            for (let i = 0; i < data.length; i++) {
                values.push(data[i][label.key]);
            }
            return { label, values };
        });

        let chartData = yAxisSet.map(yAxisObj => {
            return {
                x: xAxis,
                y: yAxisObj.values,
                type: 'scatter',
                name: yAxisObj.label.label
            };
        });

        // For Chart Responsiveness
        const D3 = Plotly.d3;
        const GD3 = D3.select('#lineChart')
            .append('div')
            .style({
                width: CHART_OPTIONS.width + '%',
                'margin-left': (100 - CHART_OPTIONS.width) / 2 + '%',

                height: CHART_OPTIONS.height + 'vh',
                'max-height': CHART_OPTIONS.maxHeight + 'px'
            });
        const GD = GD3.node();

        vueChart.gd = GD;
        vueChart.chart = Plotly.plot(GD, chartData);
    }

    function formatData(response) {
        let groups = {};
        let labels = [];

        for (let i = 0; i < response.length; i++) {
            let group = response[i];
            let groupKey = group.label.toLowerCase();

            labels.push({
                key: groupKey,
                label: group.label
            });

            for (let j = 0; j < group.data.length; j++) {
                let date = group.data[j][0];
                let value = group.data[j][1];

                let assignTo = groups[date] ? groups[date] : { date, values: [] };

                groups[date] = Object.assign(
                    assignTo,
                    {
                        [groupKey]: value,
                        values: assignTo.values.concat(value)
                    }
                );
            }

        }

        return {
            groups,
            data: Object.keys(groups).map(key => groups[key]),
            labels
        };
    }

})(window, Plotly);
