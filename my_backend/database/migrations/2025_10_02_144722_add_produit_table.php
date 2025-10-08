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
            $table->unsignedBigInteger('client_id'); // clé étrangère vers clients

            // Définition de la contrainte de clé étrangère
            $table->foreign('client_id')
                  ->references('id_client')
                  ->on('clients')
                  ->onDelete('cascade'); // si le client est supprimé, les produits le sont aussi
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
