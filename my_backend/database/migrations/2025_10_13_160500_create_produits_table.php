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
        Schema::create('produits', function (Blueprint $table) {
            $table->id('id_produit'); // clé primaire
            $table->string('title');
            $table->text('description');
            $table->string('categorie');
            $table->string('image_produit')->nullable();
            
            // 🔹 Clé étrangère vers la table clients
            $table->unsignedBigInteger('client_id');

            $table->foreign('client_id')
                  ->references('id_client')
                  ->on('clients')
                  ->onDelete('cascade');

           
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};
