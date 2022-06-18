<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Search;
use App\History;
use Carbon\Carbon;

class SearchController extends Controller
{
    public function add()
    {
        return view('admin.search.create');
    }

    public function create(Request $request)
    {
        // Varidationを行う
        $this->validate($request, Search::$rules);

        $search = new Search;
        $form = $request->all();

        // フォームから画像が送信されてきたら、保存して、$news->image_path に画像のパスを保存する
        if (isset($form['image'])) {
            $path = $request->file('image')->store('public/image');
            $search->image_path = basename($path);
        } else {
            $search->image_path = null;
        }

        // フォームから送信されてきた_tokenを削除する
        unset($form['_token']);
        // フォームから送信されてきたimageを削除する
        unset($form['image']);

        // データベースに保存する
        $search->fill($form);
        $search->save();  
        // admin/news/createにリダイレクトする
        return redirect('admin/search/create');
    }

    public function index(Request $request)
    {
        $cond_title = $request->cond_title;
        if ($cond_title != '') {
            // 検索されたら検索結果を取得する
            $posts = Search::where('title', $cond_title)->get();
        } else {
            // それ以外はすべてのニュースを取得する
            $posts = Search::all();
        }
        return view('admin.search.index', ['posts' => $posts, 'cond_title' => $cond_title]);
    }

    public function edit(Request $request)
    {
        // News Modelからデータを取得する
        $search = Search::find($request->id);
        if (empty($search)) {
            abort(404);    
        }
        return view('admin.search.edit', ['search_form' => $search]);
    }

    public function update(Request $request)
    {
        // Validationをかける
        $this->validate($request, Search::$rules);
        // News Modelからデータを取得する
        $news = Search::find($request->id);
        // 送信されてきたフォームデータを格納する
        $news_form = $request->all();
        if ($request->remove == 'true') {
            $search_form['image_path'] = null;
        } elseif ($request->file('image')) {
            $path = $request->file('image')->store('public/image');
            $search_form['image_path'] = basename($path);
        } else {
            $search_form['image_path'] = $search->image_path;
        }

        unset($search_form['image']);
        unset($search_form['remove']);
        unset($search_form['_token']);
        $search->fill($search_form)->save();
        $history = new History;
        $history->search_id = $search->id;
        $history->edited_at = Carbon::now();
        $history->save();        
        // 該当するデータを上書きして保存する
        return redirect('admin/search');
    }

    public function delete(Request $request)
    {
        // 該当するNews Modelを取得
        $search = Search::find($request->id);
        // 削除する
        $search->delete();
        return redirect('admin/search/');
    }
}
