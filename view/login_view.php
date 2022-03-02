    <div class="container-xl p-5" contenteditable="false">
        <div class="row d-flex justify-content-center">
            <div class="col-3 align-items-center">
                <div id="login_forms">
                    <div class="card">
                        <div class="card-header bg-primary text-white text-center">
                            <h5 class="card-title m-0">ログイン</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text small">IDとパスワードを入力してください。</p>
                            <form>
                                <div class="form-group">
                                    <label for="login_id">ID</label>
                                    <input type="tel" class="form-control" id="login_id" max-length="20" placeholder="半角英数4~20文字で入力">
                                    <small id="login_id_notice" class="form-text"></small>
                                </div>
                                <div class="form-group">
                                    <label for="login_password">パスワード</label>
                                    <input type="password" class="form-control" id="login_password" max-length="16" placeholder="半角4~16文字で入力">
                                    <small id="login_password_notice" class="form-text"></small>
                                </div>
                                <small id="login_error" class="form-text text-danger"></small>
                                <button type="button" class="btn btn-primary" id="login_button">ログイン</button>
                            </form>
                        </div>
                        <div class="card-footer text-primary text-right">
                            <button type="button" class="btn btn-sm btn-secondary" id="to_regist">→新規登録フォーム</button>
                        </div>
                    </div>
                </div>
                <div id="regist_forms">
                    <div class="card">
                        <div class="card-header bg-primary text-white text-center">
                            <h5 class="card-title m-0">新規ユーザー登録</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text small">登録するIDとパスワードを入力してください。</p>
                            <form>
                                <div class="form-group">
                                    <label for="regist_id">ID</label>
                                    <input type="tel" class="form-control" id="regist_id" placeholder="半角英数4文字以上で入力" data-okng="NG">
                                    <small id="regist_id_notice" class="form-text"></small>
                                </div>
                                <div class="form-group">
                                    <label for="regist_password">パスワード</label>
                                    <input type="password" class="form-control" id="regist_password" placeholder="半角4~16文字で入力" data-okng="NG">
                                    <small id="regist_password_notice" class="form-text"></small>
                                </div>
                                <div class="form-group">
                                    <label for="regist_password_confirm">パスワード確認再入力</label>
                                    <input type="password" class="form-control" id="regist_password_confirm" placeholder="半角4~16文字で入力" data-okng="NG">
                                    <small id="regist_password_confirm_notice" class="form-text"></small>
                                </div>
                                <small id="regist_error" class="form-text text-danger"></small>
                                <button type="button" class="btn btn-primary mt-2 disabled" id="regist_button">新規ユーザー登録</button>
                            </form>
                        </div>
                        <div class="card-footer text-primary text-right">
                            <button type="button" class="btn btn-sm btn-secondary" id="to_login">→ログインフォーム</button>
                        </div>
                    </div>
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