import fs from 'fs';
import badgePlugin from '@form8ion/remark-inject-badges';
import legacyMarkerPlugin from '@form8ion/remark-update-legacy-badge-markers';
import readmePlugin from '@form8ion/remark-readme';
import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';
import * as remark from '../thirdparty-wrappers/remark';
import {settings} from '../.remarkrc';
import lift from './lift';

suite('lift', () => {
  let sandbox, process, use;
  const badges = any.simpleObject();
  const documentation = any.simpleObject();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(remark, 'default');
    sandbox.stub(fs, 'readFileSync');
    sandbox.stub(fs, 'writeFileSync');

    const data = sinon.stub();
    use = sinon.stub();
    process = sinon.stub();
    remark.default.returns({data});
    data.withArgs('settings', settings).returns({use});
    use.withArgs(legacyMarkerPlugin).returns({use});
    use.withArgs(badgePlugin, badges).returns({use});
  });

  teardown(() => sandbox.restore());

  test('that the readme is updated', async () => {
    const projectRoot = any.string();
    const pathToReadmeFile = `${projectRoot}/README.md`;
    const existingFileContents = any.string();
    const updatedFileContents = any.string();
    use.withArgs(readmePlugin, documentation).returns({process});
    process.withArgs(existingFileContents).yields(null, updatedFileContents);
    fs.readFileSync.withArgs(pathToReadmeFile, 'utf8').returns(existingFileContents);

    await lift({projectRoot, results: {badges, documentation}});

    assert.calledWith(fs.writeFileSync, pathToReadmeFile, updatedFileContents);
  });

  test('that `documentation` content defaults to an empty object', async () => {
    const projectRoot = any.string();
    const pathToReadmeFile = `${projectRoot}/README.md`;
    const existingFileContents = any.string();
    const updatedFileContents = any.string();
    use.withArgs(readmePlugin, {}).returns({process});
    process.withArgs(existingFileContents).yields(null, updatedFileContents);
    fs.readFileSync.withArgs(pathToReadmeFile, 'utf8').returns(existingFileContents);

    await lift({projectRoot, results: {badges}});

    assert.calledWith(fs.writeFileSync, pathToReadmeFile, updatedFileContents);
  });

  test('that a processing failure rejects the promise', async () => {
    const error = new Error('from test');
    use.withArgs(readmePlugin, documentation).returns({process});
    process.yields(error);

    try {
      await lift({results: {badges, documentation}});

      throw new Error('Calling the lifter should have thrown an error in this test');
    } catch (err) {
      assert.equal(err, error);
    }
  });
});
