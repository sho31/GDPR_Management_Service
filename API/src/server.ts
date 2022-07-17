import App from '@/app';
import IndexRoute from '@routes/index.route';
import AnswersRoute from '@routes/answer.route';
import DataRoute from '@routes/data.route';
import DataRequestsRoute from '@routes/dataRequest.route';
import DataSubjectCategoryRoute from '@routes/dataSubjectCategory.route';
import DataTypeRoute from '@routes/dataType.route';
import DataSubjectRoute from '@routes/dataSubject.route';
import PersonalDataCategoryRoute from '@routes/personalDataCategory.route';
import ProviderRoute from '@routes/provider.route';
import TutorRoute from '@routes/tutor.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([
  new IndexRoute(),
  new AnswersRoute(),
  new DataRoute(),
  new DataRequestsRoute(),
  new DataSubjectCategoryRoute(),
  new DataTypeRoute(),
  new DataSubjectRoute(),
  new PersonalDataCategoryRoute(),
  new ProviderRoute(),
  new TutorRoute(),
]);

app.listen();
