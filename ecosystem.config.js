module.exports = {
  apps : [{
    name   : "powermeter_reader",
    script : "python ./read_modbus.py",
    instances: 1,
    time: true
  },{
    name   : "hourly_avg_cron",
    script : "python ./corn_calc_data_hourly.py",
    instances: 1,
    cron_restart: "0 * * * *",
    time: true
  },{
    name   : "daily_avg_cron",
    script : "python ./corn_calc_data_daily.py",
    instances: 1,
    cron_restart: "0 0 * * *",
    time: true
  },{
    name   : "weekly_avg_cron",
    script : "python ./corn_calc_data_weekly.py",
    instances: 1,
    cron_restart: "0 0 * * 1",
    time: true
  },{
    name   : "monthly_avg_cron",
    script : "python ./corn_calc_data_monthly.py",
    instances: 1,
    cron_restart: "0 0 1 * *",
    time: true
  },{
    name   : "yearly_avg_cron",
    script : "python ./corn_calc_data_yearly.py",
    instances: 1,
    cron_restart: "0 0 1 1 *",
    time: true
  }]
}
