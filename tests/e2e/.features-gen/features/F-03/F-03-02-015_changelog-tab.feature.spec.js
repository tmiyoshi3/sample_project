// Generated from: features/F-03/F-03-02-015_changelog-tab.feature
import { test } from "playwright-bdd";

test.describe('変更履歴タブの表示', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('変更履歴がある製品でタイムラインが表示される', { tag: ['@F-03-02-015', '@UC-010', '@正常系'] }, async ({ Given, When, Then, page }) => { 
    await Given('製品ID "1" の製品詳細画面を表示している', null, { page }); 
    await When('「変更履歴」タブをクリックする', null, { page }); 
    await Then('変更履歴タイムラインに2件のエントリが表示されている', null, { page }); 
  });

  test('UPDATE型の変更履歴で旧値→新値が表示される', { tag: ['@F-03-02-015', '@UC-010', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品ID "1" の製品詳細画面を表示している', null, { page }); 
    await When('「変更履歴」タブをクリックする', null, { page }); 
    await Then('変更履歴に変更種別「unit_price」が表示されている', null, { page }); 
    await And('変更履歴に旧値「145000」が表示されている', null, { page }); 
    await And('変更履歴に新値「148000」が表示されている', null, { page }); 
    await And('変更履歴に変更者「高橋優希」が表示されている', null, { page }); 
  });

  test('CREATE型の変更履歴が表示される', { tag: ['@F-03-02-015', '@UC-010', '@正常系'] }, async ({ Given, When, Then, page }) => { 
    await Given('製品ID "1" の製品詳細画面を表示している', null, { page }); 
    await When('「変更履歴」タブをクリックする', null, { page }); 
    await Then('変更履歴に変更種別「CREATE」が表示されている', null, { page }); 
  });

  test('変更履歴がない製品で空状態メッセージが表示される', { tag: ['@F-03-02-015', '@UC-010', '@データ状態'] }, async ({ Given, When, Then, page }) => { 
    await Given('製品ID "50" の製品詳細画面を表示している', null, { page }); 
    await When('「変更履歴」タブをクリックする', null, { page }); 
    await Then('「変更履歴はありません」メッセージが表示されている', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-02-015_changelog-tab.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":13,"tags":["@F-03-02-015","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When 「変更履歴」タブをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"変更履歴","children":[]}}]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then 変更履歴タイムラインに2件のエントリが表示されている","stepMatchArguments":[{"group":{"start":11,"value":"2","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":17,"pickleLine":19,"tags":["@F-03-02-015","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":20,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"When 「変更履歴」タブをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"変更履歴","children":[]}}]},{"pwStepLine":20,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then 変更履歴に変更種別「unit_price」が表示されている","stepMatchArguments":[{"group":{"start":10,"value":"unit_price","children":[]}}]},{"pwStepLine":21,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And 変更履歴に旧値「145000」が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"145000","children":[]}}]},{"pwStepLine":22,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"And 変更履歴に新値「148000」が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"148000","children":[]}}]},{"pwStepLine":23,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And 変更履歴に変更者「高橋優希」が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"高橋優希","children":[]}}]}]},
  {"pwTestLine":26,"pickleLine":28,"tags":["@F-03-02-015","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":28,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When 「変更履歴」タブをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"変更履歴","children":[]}}]},{"pwStepLine":29,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then 変更履歴に変更種別「CREATE」が表示されている","stepMatchArguments":[{"group":{"start":10,"value":"CREATE","children":[]}}]}]},
  {"pwTestLine":32,"pickleLine":36,"tags":["@F-03-02-015","@UC-010","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":37,"keywordType":"Context","textWithKeyword":"Given 製品ID \"50\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"50\"","children":[{"start":6,"value":"50","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":34,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"When 「変更履歴」タブをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"変更履歴","children":[]}}]},{"pwStepLine":35,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"Then 「変更履歴はありません」メッセージが表示されている","stepMatchArguments":[]}]},
]; // bdd-data-end