// Generated from: features/F-01/F-01-01-004_language.feature
import { test } from "playwright-bdd";

test.describe('ログイン画面の言語切替', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('ユーザーが未認証状態である', null, { page }); 
    await And('ログイン画面が表示されている', null, { page }); 
  });
  
  test('言語切替ドロップダウンが表示されている', { tag: ['@F-01-01-004', '@UC-002', '@正常系'] }, async ({ Then, And, page }) => { 
    await Then('画面右上に言語切替ドロップダウンが表示されている', null, { page }); 
    await And('現在の言語が "日本語" と表示されている', null, { page }); 
  });

  test('言語選択肢が正しく表示される', { tag: ['@F-01-01-004', '@UC-002', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('言語切替ドロップダウンをクリックする', null, { page }); 
    await Then('"日本語" の選択肢が表示される', null, { page }); 
    await And('英語の選択肢が表示される', null, { page }); 
  });

  test('英語に切り替えるとログイン画面が英語で表示される', { tag: ['@F-01-01-004', '@UC-002', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('言語切替ドロップダウンをクリックする', null, { page }); 
    await And('英語を選択する', null, { page }); 
    await Then('ログイン画面の全テキストが英語で表示される', null, { page }); 
    await And('言語切替ドロップダウンの表示が英語に変わる', null, { page }); 
  });

  test('日本語に切り替えるとログイン画面が日本語で表示される', { tag: ['@F-01-01-004', '@UC-002', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('ログイン画面が英語で表示されている', null, { page }); 
    await When('言語切替ドロップダウンをクリックする', null, { page }); 
    await And('日本語を選択する', null, { page }); 
    await Then('ログイン画面の全テキストが日本語で表示される', null, { page }); 
    await And('言語切替ドロップダウンの表示が "日本語" に変わる', null, { page }); 
  });

  test('現在と同じ言語を選択した場合画面が再読み込みされる', { tag: ['@F-01-01-004', '@UC-002', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('言語切替ドロップダウンをクリックする', null, { page }); 
    await And('"日本語" を選択する', null, { page }); 
    await Then('ログイン画面が再表示される', null, { page }); 
    await And('表示内容は変わらない', null, { page }); 
  });

  test.skip('言語切替時にセッションがタイムアウトしている場合', { tag: ['@F-01-01-004', '@UC-002', '@エラー', '@skip'] }, async ({ Given, When, Then, And }) => { 
    await Given('ログイン画面のセッションがタイムアウトしている'); 
    await When('言語切替ドロップダウンをクリックする'); 
    await And('英語を選択する'); 
    await Then('"ログイン試行がタイムアウトしました。ログインは最初から開始されます。" というメッセージが表示される'); 
  });

  test('対応言語は2言語のみである', { tag: ['@F-01-01-004', '@UC-002', '@データ状態'] }, async ({ When, Then, page }) => { 
    await When('言語切替ドロップダウンをクリックする', null, { page }); 
    await Then('選択肢は日本語と英語の2言語のみ表示される', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-01/F-01-01-004_language.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":12,"tags":["@F-01-01-004","@UC-002","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then 画面右上に言語切替ドロップダウンが表示されている","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And 現在の言語が \"日本語\" と表示されている","stepMatchArguments":[{"group":{"start":7,"value":"\"日本語\"","children":[{"start":8,"value":"日本語","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":16,"pickleLine":17,"tags":["@F-01-01-004","@UC-002","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When 言語切替ドロップダウンをクリックする","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then \"日本語\" の選択肢が表示される","stepMatchArguments":[{"group":{"start":0,"value":"\"日本語\"","children":[{"start":1,"value":"日本語","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And 英語の選択肢が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":22,"pickleLine":23,"tags":["@F-01-01-004","@UC-002","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When 言語切替ドロップダウンをクリックする","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"And 英語を選択する","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then ログイン画面の全テキストが英語で表示される","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And 言語切替ドロップダウンの表示が英語に変わる","stepMatchArguments":[]}]},
  {"pwTestLine":29,"pickleLine":30,"tags":["@F-01-01-004","@UC-002","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":31,"keywordType":"Context","textWithKeyword":"Given ログイン画面が英語で表示されている","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"When 言語切替ドロップダウンをクリックする","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"And 日本語を選択する","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then ログイン画面の全テキストが日本語で表示される","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"And 言語切替ドロップダウンの表示が \"日本語\" に変わる","stepMatchArguments":[{"group":{"start":16,"value":"\"日本語\"","children":[{"start":17,"value":"日本語","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":37,"pickleLine":38,"tags":["@F-01-01-004","@UC-002","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"When 言語切替ドロップダウンをクリックする","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"And \"日本語\" を選択する","stepMatchArguments":[{"group":{"start":0,"value":"\"日本語\"","children":[{"start":1,"value":"日本語","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":40,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then ログイン画面が再表示される","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"And 表示内容は変わらない","stepMatchArguments":[]}]},
  {"pwTestLine":44,"pickleLine":47,"skipped":true,"tags":["@F-01-01-004","@UC-002","@エラー","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true},{"pwStepLine":45,"gherkinStepLine":48,"keywordType":"Context","textWithKeyword":"Given ログイン画面のセッションがタイムアウトしている"},{"pwStepLine":46,"gherkinStepLine":49,"keywordType":"Action","textWithKeyword":"When 言語切替ドロップダウンをクリックする"},{"pwStepLine":47,"gherkinStepLine":50,"keywordType":"Action","textWithKeyword":"And 英語を選択する"},{"pwStepLine":48,"gherkinStepLine":51,"keywordType":"Outcome","textWithKeyword":"Then \"ログイン試行がタイムアウトしました。ログインは最初から開始されます。\" というメッセージが表示される"}]},
  {"pwTestLine":51,"pickleLine":56,"tags":["@F-01-01-004","@UC-002","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":57,"keywordType":"Action","textWithKeyword":"When 言語切替ドロップダウンをクリックする","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":58,"keywordType":"Outcome","textWithKeyword":"Then 選択肢は日本語と英語の2言語のみ表示される","stepMatchArguments":[]}]},
]; // bdd-data-end