import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import DataSubjectCategoryRoute from '@routes/dataSubjectCategory.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new DataSubjectCategoryRoute()]);

app.listen();
