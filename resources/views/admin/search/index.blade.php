@extends('layouts.admin')
@section('title', '登録済みコメントの一覧')

@section('content')
<div class="container">
  <div class="row">
    <h2>コメント一覧</h2>
  </div>
  <div class="row">
    <div class="col-md-4">
      <a href="{{ action('Admin\SearchController@add') }}" role="button" class="btn btn-primary">新規作成</a>
    </div>
          <div class="col-md-2">
            {{ csrf_field() }}
            <input type="submit" class="btn btn-primary" value="検索">
          </div>    
      </form>
    </div>
  </div>
  <div class="row">
    <div class="list-search col-md-12 mx-auto">
      <div class="row">
        <table class="table table-dark">
          <thead>
            <tr>
              <th width="10%">ID</th>
              <th width="50%">本文</th>
            </tr>
          </thead>
          <tbody>
            @foreach($posts as $search)
            <tr>
              <th>{{ $search->id }}</th>
              <td>{{ \Str::limit($search->body, 250) }}</td>
              <td>
                <div>
                  <a href="{{ action('Admin\SearchController@edit', ['id' => $search->id]) }}">編集</a>
                </div>
              </td>
              <td>
                <div>
                  <a href="{{ action('Admin\SearchController@delete', ['id' => $search->id]) }}">削除</a>
                </div>	      
              </td>
            </tr>
            @endforeach
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
@endsection
