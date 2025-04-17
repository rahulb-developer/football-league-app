points_table_query = '''select group_stage,sl_no,club_name,match_played,won,draw,lost,goals_for,goals_against,goal_difference,points,last_5 from points_table'''

league_clubs = '''select team,image from clubs'''

fixtures = '''( SELECT DISTINCT ON (home_team, away_team, match_date)
                    match_date, home_team, away_team, home_score, away_score, result
                FROM fixtures
                WHERE match_date BETWEEN CURRENT_DATE - INTERVAL '1 week' AND CURRENT_DATE - INTERVAL '1 day'
                ORDER BY home_team, away_team, match_date DESC
                LIMIT 3 )
                UNION
                ( SELECT DISTINCT ON (home_team, away_team, match_date)
                    match_date, home_team, away_team, home_score, away_score, result
                FROM fixtures
                WHERE match_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '1 week'
                ORDER BY home_team, away_team, match_date
                LIMIT 5
                ) ORDER BY match_date;'''

club_fixtures = '''SELECT DISTINCT ON (home_team, away_team, match_date)
                    match_date, home_team, away_team, home_score, away_score, result
                FROM fixtures
                WHERE home_team = %s OR away_team = %s
                ORDER BY home_team, away_team, match_date;'''

league_detail = '''select name,league_or_club,short_introduction,founded,headquarters,current_champions,international_cups,manager,stadium,logo_url from about where about.league_or_club = 'League' '''

club_detail = '''select name,league_or_club,short_introduction,founded,headquarters,current_champions,international_cups,manager,stadium,logo_url from about where about.league_or_club = 'Club' and name = %s'''

team_profile = '''select id, name, photo_url from teams where name = %s'''

