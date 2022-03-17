<div class="container-xl p-5" contenteditable="false">
    <div class="row d-flex justify-content-center">
        <div class="col-6 align-items-center">
            <div class="card" id="user_info">
                <div class="card-header">
                    あなたのユーザーアカウント情報
                </div>
                <div class="card-body text-info">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <h5 class="card-title">登録番号</h5>
                            <p class="card-text text-dark px-5" id="regist_number"></p>
                        </li>
                        <li class="list-group-item">
                            <h5 class="card-title">ユーザーID</h5>
                            <div class="row px-5">
                                <p class="card-text text-dark col-8 mb-0" id="user_id"></p>
                                <button id="show_change_id_box" class="btn btn-sm btn-outline-primary col-2 ml-auto mb-0">変更</button>
                                <button id="hide_change_id_box" class="btn btn-sm btn-outline-secondary col-2 ml-auto mb-0">やめる</button>
                            </div>
                            <form id="change_id_box" class="form-inline row px-5" onsubmit="return false;">
                                <div class="form-group form-group-sm">
                                    <input type="text" class="form-control col-8 mr-auto" id="change_user_id" data-okng="NG" maxlength="20" placeholder="変更後のユーザーIDを入力してください。">
                                    <input type="button" id="submit_change_user_id" class="btn btn-sm btn-primary col-2 ml-auto disabled" disabled="disabled" value="保存">
                                </div>
                                <small id="change_user_id_notice" class="form-text"></small>
                            </form>

                        </li>
                        <li class="list-group-item">
                            <h5 class="card-title">パスワード</h5>
                            <div class="row px-5">
                                <p class="card-text text-dark col-8 mb-0" id="user_id">＊＊＊＊＊＊＊＊＊＊＊＊＊</p>
                                <button id="show_change_pass_box" class="btn btn-sm btn-outline-primary col-2 ml-auto mb-0">変更</button>
                                <button id="hide_change_pass_box" class="btn btn-sm btn-outline-secondary col-2 ml-auto mb-0">やめる</button>
                            </div>
                            <form id="change_pass_box" class="form-inline row px-5" onsubmit="return false;">
                                <div class="form-group form-group-sm">
                                    <input type="text" class="form-control col-8 mr-auto" id="change_password" data-okng="NG" maxlength="20" placeholder="変更後のパスワードを入力してください。">
                                    <input type="text" class="form-control col-8 mr-auto" id="change_password_confirm" data-okng="NG" maxlength="20" placeholder="変更後のパスワードを再入力してください。">
                                    <input type="button" id="submit_change_pass" class="btn btn-sm btn-primary col-2 ml-auto disabled" disabled="disabled" value="保存">
                                </div>
                                <small id="change_password_notice" class="form-text"></small>
                                <small id="change_password_confirm_notice" class="form-text"></small>
                            </form>

                        </li>
                        <li class="list-group-item">
                            <h5 class="card-title">登録日時</h5>
                            <p class="card-text text-dark px-5" id="regist_date"></p>
                        </li>
                        <li class="list-group-item">
                            <h5 class="card-title">最終ログイン日時</h5>
                            <p class="card-text text-dark px-5" id="last_login_date"></p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="confirm_pass" data-keyboard="false" tabindex="-1" aria-labelledby="confirm_modalLabel" aria-hidden="true" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="confirm_modalLabel">パスワード確認</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
            </div>
            <div class="modal-body">
                <p>確認のためパスワードを入力後にOKボタンを押してください。</p>
                <div class="form-group">
                    <label for="password">パスワード</label>
                    <input type="password" class="form-control" id="password" placeholder="半角4~16文字で入力" maxlength="16">
                    <small id="password_notice" class="form-text"></small>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">閉じる</button>
                <button type="button" class="btn btn-primary" id="check_pass">OK</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="confirm_modal" data-keyboard="false" tabindex="-1" aria-labelledby="confirm_modalLabel" aria-hidden="true" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="confirm_modalLabel"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">閉じる</button>
            </div>
        </div>
    </div>
</div>