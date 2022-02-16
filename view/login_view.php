    <div class="container-xl p-5">
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
                                    <input type="tel" class="form-control" id="login_id" placeholder="半角英数4文字以上で入力">
                                    <small id="login_id_caution" class="form-text text-muted"></small>
                                </div>
                                <div class="form-group">
                                    <label for="login_password">パスワード</label>
                                    <input type="password" class="form-control" id="login_password" placeholder="半角英数4文字以上で入力">
                                    <small id="login_password_caution" class="form-text text-muted"></small>
                                </div>
                                <small id="login_error" class="form-text text-danger text-muted"></small>
                                <button type="submit" class="btn btn-primary" id="login_submit">ログイン</button>
                            </form>
                        </div>
                        <div class="card-footer text-primary text-right">
                            <button type="button" class="btn btn-secondary"  id="to_regist">→新規ユーザー登録</button>
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
                                    <input type="tel" class="form-control" id="regist_id" placeholder="半角英数4文字以上で入力">
                                    <small id="regist_id_caution" class="form-text text-muted"></small>
                                </div>
                                <div class="form-group">
                                    <label for="regist_password">パスワード</label>
                                    <input type="password" class="form-control" id="regist_password" placeholder="半角英数4文字以上で入力">
                                    <small id="regist_password_caution" class="form-text text-muted"></small>
                                </div>
                                <small id="regist_error" class="form-text text-muted"></small>
                                <button type="submit" class="btn btn-primary" id="regist_submit">新規ユーザー登録</button>
                            </form>
                        </div>
                        <div class="card-footer text-primary text-right">
                            <button type="button" class="btn btn-secondary" id="to_login">→ログイン</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>