// Generated from: features/F-02/F-02-01-003_pending-approvals.feature
import { test } from "playwright-bdd";

test.describe('承認待ちタスク確認', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('ダッシュボード画面が表示されている', null, { page }); 
  });
  
  test('承認待ちがある場合のカード表示', { tag: ['@F-02-01-003', '@UC-006', '@正常系'] }, async ({ Given, Then, And, page }) => { 
    await Given('承認待ちの発注書または購買依頼が存在する'); 
    await Then('"承認待ち" カードのメイン値が0より大きい', null, { page }); 
    await And('"承認待ち" カードが強調表示されている', null, { page }); 
    await And('"承認待ち" カードに "承認が必要なタスク" という説明が表示されている', null, { page }); 
  });

  test.skip('承認待ちがない場合のカード表示', { tag: ['@F-02-01-003', '@UC-006', '@正常系', '@skip'] }, async ({ Given, Then, And }) => { 
    await Given('承認待ちの発注書および購買依頼が存在しない'); 
    await Then('"承認待ち" カードのメイン値が "0" である'); 
    await And('"承認待ち" カードが強調表示されていない'); 
  });

  test('承認待ちカードをクリックするとマイタスク画面に遷移する', { tag: ['@F-02-01-003', '@UC-006', '@ナビゲーション'] }, async ({ When, Then, page }) => { 
    await When('"承認待ち" カードをクリックする', null, { page }); 
    await Then('マイタスク画面に遷移する', null, { page }); 
  });

  test('全ロールのユーザーが承認待ちカードを閲覧できる', { tag: ['@F-02-01-003', '@UC-006', '@権限'] }, async ({ Given, Then, And, page }) => { 
    await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
    await And('ダッシュボード画面が表示されている', null, { page }); 
    await Then('"承認待ち" カードが表示されている', null, { page }); 
    await And('"承認待ち" カードのメイン値が表示されている', null, { page }); 
  });

  test.skip('承認待ち件数は発注書と購買依頼の合計である', { tag: ['@F-02-01-003', '@UC-006', '@データ状態', '@skip'] }, async ({ Given, Then, And }) => { 
    await Given('承認待ちの発注書が存在する'); 
    await And('承認待ちの購買依頼が存在する'); 
    await Then('"承認待ち" カードのメイン値が発注書と購買依頼の承認待ち合計である'); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-02/F-02-01-003_pending-approvals.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":12,"tags":["@F-02-01-003","@UC-006","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given 承認待ちの発注書または購買依頼が存在する","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then \"承認待ち\" カードのメイン値が0より大きい","stepMatchArguments":[{"group":{"start":0,"value":"\"承認待ち\"","children":[{"start":1,"value":"承認待ち","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And \"承認待ち\" カードが強調表示されている","stepMatchArguments":[{"group":{"start":0,"value":"\"承認待ち\"","children":[{"start":1,"value":"承認待ち","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And \"承認待ち\" カードに \"承認が必要なタスク\" という説明が表示されている","stepMatchArguments":[{"group":{"start":0,"value":"\"承認待ち\"","children":[{"start":1,"value":"承認待ち","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":12,"value":"\"承認が必要なタスク\"","children":[{"start":13,"value":"承認が必要なタスク","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":18,"pickleLine":19,"skipped":true,"tags":["@F-02-01-003","@UC-006","@正常系","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true},{"pwStepLine":19,"gherkinStepLine":20,"keywordType":"Context","textWithKeyword":"Given 承認待ちの発注書および購買依頼が存在しない"},{"pwStepLine":20,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then \"承認待ち\" カードのメイン値が \"0\" である"},{"pwStepLine":21,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And \"承認待ち\" カードが強調表示されていない"}]},
  {"pwTestLine":24,"pickleLine":27,"tags":["@F-02-01-003","@UC-006","@ナビゲーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When \"承認待ち\" カードをクリックする","stepMatchArguments":[{"group":{"start":0,"value":"\"承認待ち\"","children":[{"start":1,"value":"承認待ち","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then マイタスク画面に遷移する","stepMatchArguments":[]}]},
  {"pwTestLine":29,"pickleLine":34,"tags":["@F-02-01-003","@UC-006","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":35,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":31,"gherkinStepLine":36,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Then \"承認待ち\" カードが表示されている","stepMatchArguments":[{"group":{"start":0,"value":"\"承認待ち\"","children":[{"start":1,"value":"承認待ち","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":33,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"And \"承認待ち\" カードのメイン値が表示されている","stepMatchArguments":[{"group":{"start":0,"value":"\"承認待ち\"","children":[{"start":1,"value":"承認待ち","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":36,"pickleLine":44,"skipped":true,"tags":["@F-02-01-003","@UC-006","@データ状態","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true},{"pwStepLine":37,"gherkinStepLine":45,"keywordType":"Context","textWithKeyword":"Given 承認待ちの発注書が存在する"},{"pwStepLine":38,"gherkinStepLine":46,"keywordType":"Context","textWithKeyword":"And 承認待ちの購買依頼が存在する"},{"pwStepLine":39,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"Then \"承認待ち\" カードのメイン値が発注書と購買依頼の承認待ち合計である"}]},
]; // bdd-data-end