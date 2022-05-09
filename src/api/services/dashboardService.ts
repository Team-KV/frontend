import API from 'api/api';
import { Dashboard } from 'models/Dashboard';

const dashboardService = {
  getDashboard: async (): Promise<any> => {
    const { data } = await API.get('dashboard');
    return new Dashboard(data);
  },
}

export default dashboardService;