<div class="container-xl p-5" contenteditable="false">
    <div class="row d-flex justify-content-center">
        <div class="col-6 align-items-center">
            <div class="card" id="user_info">
                <div class="card-header">
                    あなたのユーザーアカウント情報
                </div>
                <div class="card-body text-info">
                    <h5 class="card-title">登録番号</h5>
                    <p class="card-text text-dark px-5" id="regist_number"></p>
                    <h5 class="card-title">ユーザーID</h5>
                    <div class="row px-5">
                        <p class="card-text text-dark col-6" id="user_id"></p>
                        <button id="show_change_id_box" class="btn btn-sm btn-primary col-2 ml-auto">変更</button>
                    </div>
                    <form id="change_id_box" class="form-inline row px-5">
                        <div class="form-group form-group-sm mb-2 col-8">
                            <label for="changed_user_id" class="">新しいユーザーID</label>
                            <input type="text" class="form-control" id="changed_user_id" placeholder="変更後のユーザーIDを入力してください。">
                        </div>
                        <div class="form-group form-group-sm col-2">
                            <button id="save_user_info" class="btn btn-sm btn-primary">保存</button>
                        </div>
                    </form>
                    <h5 class="card-title">最終ログイン日時</h5>
                    <p class="card-text text-dark px-5" id="last_login_date"></p>
                </div>
            </div>
        </div>
    </div>
</div>