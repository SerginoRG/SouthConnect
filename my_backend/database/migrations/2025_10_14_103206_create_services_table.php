<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id('id_service');
            $table->string('titre_service');
            $table->string('image_service')->nullable();

            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('id_produit')->nullable();

            $table->foreign('client_id')
                ->references('id_client')
                ->on('clients')
                ->onDelete('cascade');

            $table->foreign('id_produit')
                ->references('id_produit')
                ->on('produits')
                ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
