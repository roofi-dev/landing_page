<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('buy_now_text')->nullable()->after('nutritional_info');
            $table->string('buy_now_link')->nullable()->after('buy_now_text');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['buy_now_text', 'buy_now_link']);
        });
    }
};
