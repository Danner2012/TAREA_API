import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-api-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-test.component.html',
  styles: [`
    .container { padding: 20px; max-width: 1200px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    .pokemon-list { 
      display: grid; 
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); 
      gap: 20px; 
      padding: 20px 0;
    }
    .pokemon-card { 
      background: #fff;
      border: none;
      border-radius: 12px; 
      text-align: center; 
      padding: 20px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
    }
    .pokemon-card:hover { 
      transform: translateY(-10px); 
      box-shadow: 0 10px 15px rgba(0,0,0,0.2);
    }
    .pokemon-card h3 { 
      margin: 10px 0; 
      color: #333; 
      text-transform: capitalize; 
      font-size: 1.1rem;
    }
    .pokemon-card img { 
      width: 120px; 
      height: 120px; 
      object-fit: contain;
    }
    .error { color: #dc3545; text-align: center; background: #f8d7da; padding: 15px; border-radius: 8px; margin: 20px 0; }
    h2 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
  `]
})
export class ApiTestComponent implements OnInit {
  pokemon: any[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPokemon().subscribe({
      next: (data) => {
        this.pokemon = data;
      },
      error: (err) => {
        this.errorMessage = 'No se pudo obtener datos de Pokémon';
        console.error(err);
      }
    });
  }
}
