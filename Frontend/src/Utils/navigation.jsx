import { calender,driver,home,plugin,report,truck,user } from "../assets/index"

export const SIDEBAR_LINKS = [
	{
		key: 1,
		label: 'Overview',
		path: '/',
		icon: home
	},
	{
		key:2,
		label: 'Vehicles',
		path: '/',
		icon: truck
	},
	{
		key: 3,
		label: 'Chargers',
		path: '/',
		icon: plugin
	},
	{
		key: 4,
		label: 'Drivers',
		path: '/',
		icon: driver
	},
	{
		key: 5,
		label: 'Schedules',
		path: '/',
		icon: calender
	},
	{
		key: 6,
		label: 'Reports',
		path: '/reports',
		icon: report
	},
	{
		key: 7,
		label: 'Admin Panel',
		path: '/',
		icon: user
	}
]