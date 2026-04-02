import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class PokemonListView(APIView):
    def get(self, request):
        try:
            poke_url = "https://pokeapi.co/api/v2/pokemon?limit=50"

            response = requests.get(poke_url, timeout=10)
            
            if response.status_code != 200:
                return Response({"error": "No se pudo obtener datos de PokeAPI"}, status=status.HTTP_502_BAD_GATEWAY)
            
            data = response.json()
            pokemon_list = []
            
            for item in data.get('results', []):
                detail_response = requests.get(item['url'], timeout=10)
                if detail_response.status_code == 200:
                    detail_data = detail_response.json()
                    pokemon_list.append({
                        "name": item['name'],
                        "image": detail_data['sprites']['front_default']
                    })
                else:
                    pokemon_list.append({
                        "name": item['name'],
                        "image": None
                    })
            
            return Response(pokemon_list, status=status.HTTP_200_OK)
            
        except requests.exceptions.RequestException as e:
            return Response({"error": "No se pudo obtener datos", "details": str(e)}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        except Exception as e:
            return Response({"error": "Ocurrió un error inesperado", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
