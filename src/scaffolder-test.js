import {promises as fs} from 'fs';
import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';
import scaffoldReadme from './scaffolder';

suite('scaffold', () => {
  let sandbox;
  const projectRoot = any.string();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(fs, 'writeFile');
  });

  teardown(() => sandbox.restore());

  test('that the README is created', async () => {
    await scaffoldReadme({projectRoot});

    assert.calledWith(fs.writeFile, `${projectRoot}/README.md`, '');
  });
});
