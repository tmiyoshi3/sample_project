// Generated from: features/F-12/F-12-01-005_notification.feature
import { test } from "playwright-bdd";

test.describe('システム通知を確認して対応する', () => {

  test.beforeEach('Background', async ({ Given }, testInfo) => { if (testInfo.error) return;
    await Given('テストデータが初期化されている'); 
  });
  
  test.skip('未読通知がある場合にバッジが表示される', { tag: ['@F-12-01-005', '@UC-002', '@正常系', '@skip'] }, async ({ Given, Then, And }) => { 
    await Given('未読通知を持つテスト用ユーザーでログインしている'); 
    await Then('通知ボタンに未読件数バッジが表示されている'); 
    await And('バッジの件数が1以上である'); 
  });

  test('未読通知がない場合はバッジが表示されない', { tag: ['@F-12-01-005', '@UC-002', '@正常系'] }, async ({ Given, Then, page }) => { 
    await Given('全通知が既読のテスト用ユーザーでログインしている', null, { page }); 
    await Then('通知ボタンにバッジが表示されていない', null, { page }); 
  });

  test('未読件数が定期的にポーリングで更新される', { tag: ['@F-12-01-005', '@UC-002', '@正常系'] }, async ({ Given, Then, page }) => { 
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await Then('未読件数取得APIが60秒間隔で呼び出されている', null, { page }); 
  });

  test.skip('未読件数API失敗時はバッジが非表示になる', { tag: ['@F-12-01-005', '@UC-002', '@エラー', '@skip'] }, async ({ Given, When, Then }) => { 
    await Given('テスト用ユーザー "ADMIN" でログインしている'); 
    await When('未読件数取得APIがエラーを返す'); 
    await Then('通知ボタンにバッジが表示されていない'); 
  });

  test.skip('通知パネルを開いて通知一覧を確認する', { tag: ['@F-12-01-005', '@UC-002', '@データ状態', '@skip'] }, async ({ Given, When, Then }) => { 
    await Given('未読通知を持つテスト用ユーザーでログインしている'); 
    await When('通知ボタンをクリックする'); 
    await Then('通知パネルが表示される'); 
  });

  test.skip('個別の通知を既読にすると未読件数が減る', { tag: ['@F-12-01-005', '@UC-002', '@データ状態', '@skip'] }, async ({ Given, When, Then, And }) => { 
    await Given('未読通知を持つテスト用ユーザーでログインしている'); 
    await And('通知パネルが表示されている'); 
    await When('通知を既読にする'); 
    await Then('未読件数バッジの件数が減る'); 
  });

  test.skip('全通知を一括既読にするとバッジが消える', { tag: ['@F-12-01-005', '@UC-002', '@データ状態', '@skip'] }, async ({ Given, When, Then, And }) => { 
    await Given('未読通知を持つテスト用ユーザーでログインしている'); 
    await And('通知パネルが表示されている'); 
    await When('すべての通知を一括既読にする'); 
    await Then('通知ボタンにバッジが表示されていない'); 
  });

  test.describe('全ロールで通知ボタンが表示される', () => {

    test('Example #1', { tag: ['@F-12-01-005', '@UC-002', '@権限'] }, async ({ Given, Then, page }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await Then('通知ボタンが表示されている', null, { page }); 
    });

    test('Example #2', { tag: ['@F-12-01-005', '@UC-002', '@権限'] }, async ({ Given, Then, page }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await Then('通知ボタンが表示されている', null, { page }); 
    });

    test('Example #3', { tag: ['@F-12-01-005', '@UC-002', '@権限'] }, async ({ Given, Then, page }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await Then('通知ボタンが表示されている', null, { page }); 
    });

    test('Example #4', { tag: ['@F-12-01-005', '@UC-002', '@権限'] }, async ({ Given, Then, page }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await Then('通知ボタンが表示されている', null, { page }); 
    });

    test('Example #5', { tag: ['@F-12-01-005', '@UC-002', '@権限'] }, async ({ Given, Then, page }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await Then('通知ボタンが表示されている', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-12/F-12-01-005_notification.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":12,"skipped":true,"tags":["@F-12-01-005","@UC-002","@正常系","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true},{"pwStepLine":11,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given 未読通知を持つテスト用ユーザーでログインしている"},{"pwStepLine":12,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then 通知ボタンに未読件数バッジが表示されている"},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And バッジの件数が1以上である"}]},
  {"pwTestLine":16,"pickleLine":19,"tags":["@F-12-01-005","@UC-002","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":20,"keywordType":"Context","textWithKeyword":"Given 全通知が既読のテスト用ユーザーでログインしている","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then 通知ボタンにバッジが表示されていない","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":24,"tags":["@F-12-01-005","@UC-002","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":25,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":23,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then 未読件数取得APIが60秒間隔で呼び出されている","stepMatchArguments":[]}]},
  {"pwTestLine":26,"pickleLine":31,"skipped":true,"tags":["@F-12-01-005","@UC-002","@エラー","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true},{"pwStepLine":27,"gherkinStepLine":32,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている"},{"pwStepLine":28,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When 未読件数取得APIがエラーを返す"},{"pwStepLine":29,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then 通知ボタンにバッジが表示されていない"}]},
  {"pwTestLine":32,"pickleLine":40,"skipped":true,"tags":["@F-12-01-005","@UC-002","@データ状態","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true},{"pwStepLine":33,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"Given 未読通知を持つテスト用ユーザーでログインしている"},{"pwStepLine":34,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When 通知ボタンをクリックする"},{"pwStepLine":35,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then 通知パネルが表示される"}]},
  {"pwTestLine":38,"pickleLine":46,"skipped":true,"tags":["@F-12-01-005","@UC-002","@データ状態","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true},{"pwStepLine":39,"gherkinStepLine":47,"keywordType":"Context","textWithKeyword":"Given 未読通知を持つテスト用ユーザーでログインしている"},{"pwStepLine":40,"gherkinStepLine":48,"keywordType":"Context","textWithKeyword":"And 通知パネルが表示されている"},{"pwStepLine":41,"gherkinStepLine":49,"keywordType":"Action","textWithKeyword":"When 通知を既読にする"},{"pwStepLine":42,"gherkinStepLine":50,"keywordType":"Outcome","textWithKeyword":"Then 未読件数バッジの件数が減る"}]},
  {"pwTestLine":45,"pickleLine":53,"skipped":true,"tags":["@F-12-01-005","@UC-002","@データ状態","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true},{"pwStepLine":46,"gherkinStepLine":54,"keywordType":"Context","textWithKeyword":"Given 未読通知を持つテスト用ユーザーでログインしている"},{"pwStepLine":47,"gherkinStepLine":55,"keywordType":"Context","textWithKeyword":"And 通知パネルが表示されている"},{"pwStepLine":48,"gherkinStepLine":56,"keywordType":"Action","textWithKeyword":"When すべての通知を一括既読にする"},{"pwStepLine":49,"gherkinStepLine":57,"keywordType":"Outcome","textWithKeyword":"Then 通知ボタンにバッジが表示されていない"}]},
  {"pwTestLine":54,"pickleLine":68,"tags":["@F-12-01-005","@UC-002","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":63,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":56,"gherkinStepLine":64,"keywordType":"Outcome","textWithKeyword":"Then 通知ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":59,"pickleLine":69,"tags":["@F-12-01-005","@UC-002","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":63,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":61,"gherkinStepLine":64,"keywordType":"Outcome","textWithKeyword":"Then 通知ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":64,"pickleLine":70,"tags":["@F-12-01-005","@UC-002","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":63,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":66,"gherkinStepLine":64,"keywordType":"Outcome","textWithKeyword":"Then 通知ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":69,"pickleLine":71,"tags":["@F-12-01-005","@UC-002","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":63,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":71,"gherkinStepLine":64,"keywordType":"Outcome","textWithKeyword":"Then 通知ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":74,"pickleLine":72,"tags":["@F-12-01-005","@UC-002","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":63,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":76,"gherkinStepLine":64,"keywordType":"Outcome","textWithKeyword":"Then 通知ボタンが表示されている","stepMatchArguments":[]}]},
]; // bdd-data-end